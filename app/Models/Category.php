<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;

class Category extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'slug',
        'description',
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

    protected static function booted()
    {
        static::creating(function ($category) {
            $combined = uuid_create() . '-' . $category->name;
            $category->slug = substr(sha1($combined), 0, 16);
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
