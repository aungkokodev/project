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
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@agri.com',
            'role' => 'admin',
            'password' => bcrypt('admin123')
        ]);

        $customers = User::factory(15)->create(['role' => 'customer']);

        $categories = [
            ['name' => 'Fertilizers', 'description' => 'Chemical and organic fertilizers'],
            ['name' => 'Pesticides', 'description' => 'Insecticides, fungicides, herbicides'],
            ['name' => 'Seeds', 'description' => 'High-quality crop seeds'],
            ['name' => 'Tools', 'description' => 'Farming equipment and tools'],
            ['name' => 'Irrigation', 'description' => 'Watering systems and accessories']
        ];

        foreach ($categories as $category) {
            $category['slug'] = $category['name'];
            Category::create($category);
        }

        Product::factory(50)->create()->each(function ($product) {
            ProductImage::factory(rand(1, 3))->create([
                'product_id' => $product->id,
                'is_default' => false
            ]);

            // $product->images()->first()->update(['is_default' => true]);

            // switch ($product->category->name) {
            //     case 'Fertilizers':
            //         $product->fertilizer()->create([
            //             'nutrients' => 'N' . rand(10, 30) . '-P' . rand(5, 15) . '-K' . rand(5, 15),
            //             'application_method' => ['Broadcasting', 'Foliar Spray', 'Fertigation'][rand(0, 2)],
            //             'crops_suitable' => 'Rice, Vegetables, Fruits',
            //             'dosage' => rand(20, 100) . ' kg/acre'
            //         ]);
            //         break;

            //     case 'Pesticides':
            //         $product->pesticide()->create([
            //             'active_ingredient' => ['Chlorpyrifos', 'Glyphosate', 'Imidacloprid'][rand(0, 2)] . ' ' . rand(1, 50) . '%',
            //             'target_diseases' => ['Aphids', 'Bacterial Blight', 'Powdery Mildew'][rand(0, 2)],
            //             'application_rate' => rand(50, 200) . 'ml/20L water',
            //             'safety_period' => rand(7, 21) . ' days'
            //         ]);
            //         break;
            // }
        });

        User::all()->each(function ($user) {
            Address::factory(2)->create([
                'user_id' => $user->id,
                'type' => 'shipping'
            ]);

            Address::factory()->create([
                'user_id' => $user->id,
                'type' => 'billing',
                'is_default' => true
            ]);
        });

        Cart::factory(10)->create()->each(function ($cart) {
            CartItem::factory(rand(1, 5))->create([
                'cart_id' => $cart->id
            ]);
        });

        Order::factory(30)->create()->each(function ($order) {
            $items = OrderItem::factory(rand(1, 5))->create([
                'order_id' => $order->id
            ]);

            $total = $items->sum('total_price');

            if (rand(1, 100) > 20) {
                Payment::factory()->create([
                    'order_id' => $order->id,
                    'amount' => $total,
                    'status' => $order->payment_status === 'paid' ? 'succeeded' : 'failed'
                ]);
            }
        });

        Product::inRandomOrder()->take(20)->each(function ($product) {
            Review::factory(rand(1, 3))->create([
                'product_id' => $product->id,
                'user_id' => User::where('role', 'customer')->inRandomOrder()->first()->id
            ]);
        });

        Discount::factory(5)->create();

        User::where('role', 'customer')->each(function ($user) {
            Wishlist::factory(rand(1, 5))->create([
                'user_id' => $user->id
            ]);
        });
    }
}
