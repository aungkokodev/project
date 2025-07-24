<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\User;
use App\Models\Wishlist;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        function getRandomDate($days = 90)
        {
            return Carbon::now()
                ->subDays(rand(0, $days))
                ->setHour(rand(0, 23))
                ->setMinute(rand(0, 59));
        }

        // user
        User::factory()->create([
            'name' => 'Donald Duck',
            'email' => 'admin@agri.com',
            'role' => 'admin',
            'password' => bcrypt('admin123')
        ]);

        for ($i = 0; $i < 10; $i++) {
            User::factory()->create(['role' => 'customer']);
        }


        require('category.php');

        foreach ($categories as $categoryData) {
            $mainCategory = Category::factory()->create([
                "name" => $categoryData["name"],
                "image" => '/storage/categories/' . $categoryData['image']
            ]);
            foreach ($categoryData['products'] as $productData) {
                $product = Product::factory()
                    ->create([
                        'category_id' => $mainCategory->id,
                        'name' => $productData['name'],
                        'description' => $productData['description'],
                        // 'price' => $productData['price'],
                        'unit' => $productData['unit'],
                    ]);

                foreach ($productData['images'] as $i => $image) {
                    ProductImage::factory()
                        ->create(['product_id' => $product->id, 'path' => '/storage/product_images/' . $image, 'is_default' => $i === 0]);
                }
            }

            $subcategories = $categoryData['children'];
            foreach ($subcategories as $categoryData) {
                $category = Category::factory()->create([
                    "name" => $categoryData["name"],
                    'parent_id' => $mainCategory->id,
                    "image" => '/storage/categories/' . $categoryData['image']
                ]);

                foreach ($categoryData['products'] as $productData) {
                    $product = Product::factory()
                        ->create([
                            'category_id' => $category->id,
                            'name' => $productData['name'],
                            'description' => $productData['description'],
                            // 'price' => $productData['price'],
                            'unit' => $productData['unit'],
                        ]);


                    foreach ($productData['images'] as $i => $image) {
                        ProductImage::factory()
                            ->create(['product_id' => $product->id, 'path' => '/storage/product_images/' . $image, 'is_default' => $i === 0]);
                    }
                }
            }
        }


        Product::all()->each(function ($product) {
            $numOfItems = 5;

            $users = User::inRandomOrder()->take($numOfItems)->get();

            foreach ($users as $user) {

                $comments = [
                    "Great quality tools, very durable!",
                    "Affordable prices for small farmers like me.",
                    "Fast delivery and well-packed items.",
                    "Fertilizer worked perfectly for my crops.",
                    "Seeds had a high germination rate. Happy!",
                    "Customer service was very helpful.",
                    "Highly recommend this supplier!",
                    "Sprayers are easy to use and effective.",
                    "Found all the essentials in one place.",
                    "Good selection of organic supplies.",
                    "Tractor parts fit perfectly, no issues.",
                    "Livestock feed was fresh and clean.",
                    "Love the bulk pricing options!",
                    "Simple ordering process and quick checkout.",
                    "Tools were sharp and ready to use.",
                    "My go-to store every planting season.",
                    "Reliable and trusted supplier for my farm.",
                    "Packaging could be better, but products are solid.",
                    "Easy to track my order online.",
                    "Would love more eco-friendly options."
                ];

                if (!Review::where('product_id', $product->id)->where('user_id', $user->id)->exists()) {
                    Review::factory()
                        ->create([
                            'product_id' => $product->id,
                            'user_id' => $user->id,
                            'comment' => $comments[array_rand($comments)]
                        ]);
                }
            }
        });

        // User::all()->each(function ($user) {
        //     Address::factory(2)->create([
        //         'user_id' => $user->id,
        //         'type' => 'shipping',
        //         'full_name' => $user->name,
        //         'phone' => $user->phone
        //     ]);

        //     Address::factory()->create([
        //         'user_id' => $user->id,
        //         'type' => 'billing',
        //         'is_default' => true,
        //         'full_name' => $user->name,
        //         'phone' => $user->phone
        //     ]);
        // });

        // User::where('role', 'customer')->get()->each(function ($user) {
        //     for ($i = 0; $i < 10; $i++) {
        //         $date = getRandomDate(90);
        //         $order = Order::factory()->create([
        //             'user_id' => $user->id,
        //             'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
        //             'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
        //             'status' => 'delivered',
        //             'created_at' => $date,
        //         ]);

        //         OrderItem::factory(2)->create([
        //             'order_id' => $order->id,
        //             'product_id' => Product::inRandomOrder()->first()->id,
        //             'created_at' => $date,
        //         ]);
        //     }

        //     $date = getRandomDate(90);
        //     $order = Order::factory()->create([
        //         'user_id' => $user->id,
        //         'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
        //         'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
        //         'status' => 'pending',
        //         'created_at' => $date,
        //     ]);
        //     OrderItem::factory(2)->create([
        //         'order_id' => $order->id,
        //         'product_id' => Product::inRandomOrder()->first()->id,
        //         'created_at' => $date,
        //     ]);

        //     $date = getRandomDate(90);
        //     $order = Order::factory()->create([
        //         'user_id' => $user->id,
        //         'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
        //         'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
        //         'status' => 'shipped',
        //         'created_at' => $date,
        //     ]);
        //     OrderItem::factory(2)->create([
        //         'order_id' => $order->id,
        //         'product_id' => Product::inRandomOrder()->first()->id,
        //         'created_at' => $date,
        //     ]);

        //     $date = getRandomDate(90);
        //     $order = Order::factory()->create([
        //         'user_id' => $user->id,
        //         'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
        //         'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
        //         'status' => 'cancelled',
        //         'created_at' => $date,
        //     ]);
        //     OrderItem::factory(2)->create([
        //         'order_id' => $order->id,
        //         'product_id' => Product::inRandomOrder()->first()->id,
        //         'created_at' => $date,
        //     ]);
        // });

        // Discount::factory(5)->create();

        // User::where('role', 'customer')->each(function ($user) {
        //     // Generate a random number of items to create (between 1 and 5)
        //     $numOfItems = rand(1, 5);

        //     // Create unique combinations of user and product
        //     $products = Product::inRandomOrder()->take($numOfItems)->get();

        //     foreach ($products as $product) {
        //         // Ensure the combination of user and product is unique
        //         if (!Wishlist::where('user_id', $user->id)->where('product_id', $product->id)->exists()) {
        //             Wishlist::create([
        //                 'user_id' => $user->id,
        //                 'product_id' => $product->id,
        //             ]);
        //         }
        //     }
        // });
    }
}
