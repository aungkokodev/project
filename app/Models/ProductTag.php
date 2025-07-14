<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProductTag extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'product_id',
        'tag_id'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
