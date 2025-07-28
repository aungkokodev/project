<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        function getRandomDate($days = 90)
        {
            return Carbon::now()
                ->subDays(rand(0, $days))
                ->setHour(rand(0, 23))
                ->setMinute(rand(0, 59));
        }

        // user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@agri.com',
            'role' => 'admin',
            'password' => bcrypt('admin123'),
            'avatar' => "/storage/users/admin.jpg"
        ]);

        for ($i = 0; $i < 10; $i++) {
            User::factory()->create(['role' => 'customer', 'avatar' => "/storage/users/" . $i + 1 . ".jpg"]);
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
                        'unit' => $productData['unit'],
                        'price' => $productData['price'],
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
                            'unit' => $productData['unit'],
                            'price' => $productData['price'],
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

            $users = User::where('role', 'customer')->inRandomOrder()->take($numOfItems)->get();

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
                            'comment' => $comments[array_rand($comments)],
                            'is_reviewed' => true
                        ]);
                }
            }
        });

        User::all()->each(function ($user) use ($faker) {
            Address::factory()
                ->count(2)
                ->create([
                    'user_id' => $user->id,
                    'fullname' => $user->name,
                    'type' => 'shipping',
                    'label' => $faker->randomElement(['Home', 'Office']),
                    'street' => $faker->streetAddress,
                    'city' => $faker->city,
                    'state' => $faker->state,
                    'zip_code' => $faker->postcode,
                    'country' => $faker->country,
                    'phone' => $user->phone ?? $faker->phoneNumber,
                    'is_default' => false,
                ]);
        });

        User::where('role', 'customer')->get()->each(function ($user) {
            $shipping = Address::where('user_id', $user->id)->where('type', 'shipping')->inRandomOrder()->first();
            if (!$shipping) return;

            $statuses = ['pending', 'shipped', 'delivered', 'cancelled'];
            $paymentMethods = ['cod', 'bank_transfer', 'mobile_money'];

            foreach (array_merge(array_fill(0, 10, 'delivered'), $statuses) as $status) {
                $date = getRandomDate(180);
                $order = Order::factory()->create([
                    'order_number' => 'AGRI-' . now()->format('Ymd') . '-' . Str::random(6),
                    'user_id' => $user->id,
                    'shipping_address_id' => $shipping->id,
                    'billing_address_id' => $shipping->id,
                    'total_amount' => 0,
                    'status' => $status,
                    'payment_method' => fake()->randomElement($paymentMethods),
                    'payment_status' => $status === 'delivered' ? 'paid' : 'pending',
                    'created_at' => $date,
                    'shipped_at' => $status === 'shipped' || $status === 'delivered' ? $date : null,
                    'delivered_at' => $status === 'delivered' ? $date : null,
                ]);

                $total = 0;
                for ($i = 0; $i < 2; $i++) {
                    $product = Product::inRandomOrder()->first();
                    $quantity = rand(1, 5);
                    $price = $product->price ?? 1000;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $price,
                        'created_at' => $date,
                    ]);

                    $total += $price * $quantity;
                }

                $order->update(['total_amount' => $total]);
            }
        });
    }
}
