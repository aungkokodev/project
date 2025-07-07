<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'category_id' => 'required|exists:categories,id',
            'unit' => 'required|string|max:1000',
            'price' => 'required|integer|min:0|max:999999',
            'stock_quantity' => 'required|integer|min:0|max:999999',
            // 'image' => [
            //     'required',
            //     'image',
            //     'mimes:jpeg,png,jpg,webp',
            // ],
            // 'images.*' => [
            //     'nullable',
            //     'image',
            //     'mimes:jpeg,png,jpg,webp',
            // ],
            // 'images' => 'max:5'
        ];
    }
}
