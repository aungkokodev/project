<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProductImage extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'product_id',
        'path',
        'is_default'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
