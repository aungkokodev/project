<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orderItems()
    {
        return $this->hasManyThrough(
            OrderItem::class,
            Product::class,
            'category_id',
            'product_id',
            'id',
            'id'
        );
    }

    protected static function booted()
    {
        static::creating(function ($category) {
            $baseSlug = Str::slug($category->name);
            $slug = $baseSlug;
            $i = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = "{$baseSlug}-" . $i++;
            }

            $category->slug = $slug;
        });

        static::saved(function () {
            Cache::forget('global_categories');
        });

        static::updated(function () {
            Cache::forget('global_categories');
        });

        static::deleted(function () {
            Cache::forget('global_categories');
        });
    }
}
