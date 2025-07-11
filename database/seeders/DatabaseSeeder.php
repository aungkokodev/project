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
    /**
     * Seed the application's database.
     */


    public function run(): void
    {
        function getRandomDate($days = 90)
        {
            return Carbon::now()
                ->subDays(rand(0, $days))
                ->setHour(rand(0, 23))
                ->setMinute(rand(0, 59));
        }

        User::factory()->create([
            'name' => 'Donald Duck',
            'email' => 'admin@agri.com',
            'role' => 'admin',
            'password' => bcrypt('admin123')
        ]);


        for ($i = 0; $i < 10; $i++) {
            User::factory()->create(['role' => 'customer', 'created_at' => getRandomDate(30)]);
        }

        $categories = [
            [
                'name' => 'မြေသြဇာများ',
                'description' => 'စိုက်ပျိုးမှုတိုးတက်စေသော မြေဆီလွှာအာဟာရများ',
                'image' => "example.jpg",
                'products' => [
                    ['name' => 'ရွှေကောမက်', 'description' => 'မြေဓာတ်မြင့်သောသဘာဝမြေသြဇာ'],
                    ['name' => 'စိုက်ထွေးဓာတ်မြေသြဇာ', 'description' => 'မြေညိုမှု သက်သာစေသော မြေသြဇာ'],
                    ['name' => 'ဘိုင်အိုအာဟာရမြေသြဇာ', 'description' => 'ဘိုင်အိုကန့်သတ်ထားသော မြေသြဇာ'],
                    ['name' => 'မြေသွေးလောင်မြေသြဇာ', 'description' => 'အာဟာရပြည့်ဝသော မြေသြဇာ'],
                    ['name' => 'ကြက်မှုတ်မြေသြဇာ', 'description' => 'ကြက်မှုတ်မှထုတ်သော သဘာဝမြေသြဇာ'],
                ],
                'children' => [
                    [
                        'name' => 'သဘာဝမြေသြဇာ',
                        'description' => 'သစ်ရွက်ပုပ်၊ မွှေးမြူနှင့် သဘာဝမှ ထုတ်လုပ်သော မြေသြဇာ',
                        'products' => [
                            ['name' => 'သစ်ရွက်ပုပ်မြေသြဇာ', 'description' => 'သစ်ရွက်မှထုတ်သော မြေဓာတ်မြှင့်'],
                            ['name' => 'မွှေးမြူမြေသြဇာ', 'description' => 'မွှေးမြူမှ ထုတ်လုပ်သော မြေဓာတ်မြင့်'],
                            ['name' => 'မွှေးစပ်မြေသြဇာ', 'description' => 'နံ့သာသော မြေဓာတ်မြင့်'],
                            ['name' => 'ကြက်မွှေးမြေသြဇာ', 'description' => 'ကြက်မှုတ်ပါဝင်သော မြေဓာတ်မြင့်'],
                            ['name' => 'နွားမှုတ်မြေသြဇာ', 'description' => 'နွားမှုတ်ထဲက အာဟာရများ'],
                        ],
                        'children' => [],
                    ],
                    [
                        'name' => 'ဓာတုမြေသြဇာ',
                        'description' => 'အာဟာရဓာတ်များပါဝင်သော ထုတ်လုပ်ထားသည့် ဓာတုမြေသြဇာ',
                        'products' => [
                            ['name' => 'ယူရီးယား', 'description' => 'ထို့ကြောင့် N ပါဝင်သော မြေသြဇာ'],
                            ['name' => 'NPK 15-15-15', 'description' => 'ထိုပ်တို့ NPK ၁၅% ပါဝင်'],
                            ['name' => 'အမ်မြီယမ်ဆမ်ဖိတ်', 'description' => 'ရာသီဥတုတိုင်းညီမျှ'],
                            ['name' => 'စူပါ NPK 20-20-20', 'description' => 'မြေဓာတ်အမြင့်ဆုံး NPK'],
                            ['name' => 'အချိန်တုန်မြေသြဇာ', 'description' => 'တစ်သက်တာ အာဟာရသုံးမြေသြဇာ'],
                        ],
                        'children' => [],
                    ],
                ],
            ],
            [
                'name' => 'အစာအုပ်အာဟာရများ',
                'description' => 'ပင်စည်၊ အမြစ်များအတွက် အစာအုပ်အာဟာရပေးစနစ်',
                'products' => [
                    ['name' => 'ဖော့စဖိတ်ဆာ', 'description' => 'အမြစ်ဖွံ့ဖြိုးမှုမြှင့်တင်ရေး'],
                    ['name' => 'ပေါတက်စီယမ်ဆာ', 'description' => 'အရွက်၊ အပင်အားကောင်း'],
                    ['name' => 'ကယ်လစီယမ်နိုက်ထရေး', 'description' => 'ပင်စည်ခိုင်မာ'],
                    ['name' => 'မဂ္ဂနီဆီယမ်ဆာ', 'description' => 'အရွက်လှပတောက်ပ'],
                    ['name' => 'အီသီလင်းပြန်လည်ထုတ်လုပ်ဆေး', 'description' => 'အသီးအပွင့်အမြန်ထွက်'],
                ],
                'children' => [
                    [
                        'name' => 'အမြစ်အာဟာရများ',
                        'description' => 'အမြစ်ဖြစ်စဥ်နှင့်အားဖြည့်ရန်ထုတ်လုပ်ထားသည်',
                        'products' => [
                            ['name' => 'အမြစ်သက်တမ်းတိုးဆေး', 'description' => 'မြစ်ဖျော့မှုကင်း'],
                            ['name' => 'အမြစ်တောင့်ခံဆေး', 'description' => 'ရေရှားချိန်တွင်လဲ'],
                            ['name' => 'မြစ်ဖွဲ့မော်လီကျူး', 'description' => 'အမြစ်စနစ်မြှင့်တင်ရေး'],
                            ['name' => 'အမြစ်ဖွဲ့အာဟာရ', 'description' => 'မြစ်ဖွဲ့စနစ်အတွက်'],
                            ['name' => 'အမြစ်ကြီးစေသောဆေး', 'description' => 'မြစ်ဖွဲ့မူကောင်း'],
                        ],
                        'children' => [],
                    ],
                    [
                        'name' => 'ပင်စည်အာဟာရများ',
                        'description' => 'ပင်စည်ပံ့ပိုးရေးအာဟာရ',
                        'products' => [
                            ['name' => 'ပင်စည်အပူချိန်ထိန်းဆေး', 'description' => 'ပင်ဖျော့မှုကင်း'],
                            ['name' => 'ပင်စည်တောင့်ဆေး', 'description' => 'ငါးပင်၊ ငှက်ပျောတွင်အသုံး'],
                            ['name' => 'ပင်စည်အသားချိုဆေး', 'description' => 'သစ်သီးအရသာမြှင့်တင်'],
                            ['name' => 'ပင်စည်လှပစေသောဆေး', 'description' => 'ရောင်းဝယ်မှုကောင်းမွန်'],
                            ['name' => 'ပင်စည်မန့်သည့်ဆေး', 'description' => 'ခြောက်သွေ့မှုကင်း'],
                        ],
                        'children' => [],
                    ],
                ],
            ],
            [
                'name' => 'မှိုသတ်ဆေးများ',
                'description' => 'ပင်စည်နှင့်အရွက်များအပေါ်မှိုတက်ခြင်းကိုတားဆီးရန်',
                'products' => [
                    ['name' => 'ကုပ်ပြတ်မှိုသတ်ဆေး', 'description' => 'တစ်ခါသုံးမှိုပိုးကင်းစင်'],
                    ['name' => 'ပေါင်မောင်မှိုပျောက်ဆေး', 'description' => 'အရွက်မှိုလွယ်ကူစွာဖယ်ရှား'],
                    ['name' => 'အနက်ရောင်မှိုကင်းဆေး', 'description' => 'အနက်အဖြူအညိုမှိုများဖယ်ရှား'],
                    ['name' => 'စပါးမှိုကင်းဖျန်း', 'description' => 'စပါးသီးနှံအတွက်'],
                    ['name' => 'ပျိုးခင်းကြွပ်မှိုဖျက်ဆေး', 'description' => 'ပင်ရိုးအတွင်းမှိုတက်ခြင်းကင်းစင်'],
                ],
                'children' => [
                    [
                        'name' => 'စပါးအတွက်မှိုသတ်ဆေး',
                        'description' => 'စပါးသီးနှံတွင်ဖုံးလွှမ်းသောမှိုများအတွက်',
                        'products' => [
                            ['name' => 'စပါးရိုးမှိုဖျက်ဆေး', 'description' => 'စပါးရိုးအမြစ်မှိုကင်း'],
                            ['name' => 'ရွက်ပြားမှိုဖျက်ဆေး', 'description' => 'ရွက်များတွင်ကပ်နေသောမှိုများအတွက်'],
                            ['name' => 'ပန်းနီမှိုဖျက်ဆေး', 'description' => 'ရွက်အထဲမှပျက်စီးခြင်းကင်း'],
                            ['name' => 'တောင့်သစ်မှိုသတ်ဆေး', 'description' => 'ပင်စည်မွှေးနံ့လှ'],
                            ['name' => 'အပင်တစ်သက်တာမှိုဖျက်ဆေး', 'description' => 'တစ်ကြိမ်သုံးဖြင့်လုံးဝကင်းစင်'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ဟင်းသီးဟင်းရွက်အတွက်',
                        'description' => 'မှိုကင်းစင်လှပသောဟင်းသီးဟင်းရွက်ထုတ်လုပ်ရန်',
                        'products' => [
                            ['name' => 'ခရမ်းချဉ်သီးမှိုဖျက်ဆေး', 'description' => 'ပင်စည်မှတစ်ဆင့်မှိုကင်း'],
                            ['name' => 'နာနတ်အပင်မှိုဖျက်ဆေး', 'description' => 'အမြစ်မှလုံးဝကင်း'],
                            ['name' => 'မန်ကျည်းရွက်မှိုဖျက်ဆေး', 'description' => 'ရင့်သောရွက်မှီမှိုဖယ်ရှား'],
                            ['name' => 'ငှက်ပျောပင်မှိုကင်းဆေး', 'description' => 'နံရံတွင်မွှေးစေ'],
                            ['name' => 'ပဲမွှေးပင်မှိုဖျက်ဆေး', 'description' => 'တောင့်တင်းခိုင်မာ'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'ပိုးသတ်ဆေးများ',
                'description' => 'သီးနှံအပင်များကို ပိုးမွှား၊ ငှက်ပျောပိုး စသည်ဖြင့် ပိုးမွှားပိုးဖျက်ရန် အသုံးပြုသည့်ဆေးများ',
                'products' => [
                    ['name' => 'ရွက်စားပိုးဖျက်ဆေး', 'description' => 'ရွက်စားပိုးများအတွက်'],
                    ['name' => 'ပင်မြစ်ပိုးသတ်ဆေး', 'description' => 'မြစ်ပိုးအတွက်'],
                    ['name' => 'ပိုးမွှားဖမ်းဆွဲဖျက်ဆေး', 'description' => 'ပိုးမွှားဖမ်းရန်ဆွဲဆေး'],
                    ['name' => 'ပျားဖျက်ဆေး', 'description' => 'ပျားသတ်ရန်'],
                    ['name' => 'ပိုးကင်းတောင့်ခံဆေး', 'description' => 'နံနံပြည့်တန်ဆာ'],
                ],
                'children' => [
                    [
                        'name' => 'မြေပင်အတွက်ပိုးသတ်ဆေး',
                        'description' => 'မြေပင်တွင်ရှိသော ပိုးဖျက်ရန်',
                        'products' => [
                            ['name' => 'မြစ်ပိုးဖျက်ဆေး', 'description' => 'မြစ်အတွင်းရှိပိုးများ'],
                            ['name' => 'အမြစ်ထဲဝင်ပိုးဖျက်ဆေး', 'description' => 'အမြစ်ဖောက်ဝင်ပိုးများ'],
                            ['name' => 'တောင့်ပင်သီးပိုးဖျက်ဆေး', 'description' => 'သီးများအတွင်းပိုးဖျက်'],
                            ['name' => 'ပင်ရိုးပိုးဖျက်ဆေး', 'description' => 'ပင်စည်အတွင်းပိုးကင်း'],
                            ['name' => 'အမြစ်ကင်းလှပဆေး', 'description' => 'ပင်ဖန်ဆင်းမှုကောင်းမွန်စေ'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ရွက်ပေါ်အတွက်ပိုးဖျက်ဆေး',
                        'description' => 'ရွက်ပေါ်တွင်ရှိသော ပိုးဖျက်ရန်',
                        'products' => [
                            ['name' => 'ရွက်စားပိုးဖျက်ဆေး', 'description' => 'ရွက်များစားသောပိုးများအတွက်'],
                            ['name' => 'ရွက်ထဲဝင်ပိုးဖျက်ဆေး', 'description' => 'ရွက်အတွင်းသွားပိုးများ'],
                            ['name' => 'ပွင့်စားပိုးဖျက်ဆေး', 'description' => 'ပွင့်အတွင်းဖြစ်သောပိုး'],
                            ['name' => 'သီးပိုးဖျက်ဆေး', 'description' => 'သီးထဲကဝင်ပိုးများ'],
                            ['name' => 'စိုက်ခင်းပိုးဖျက်ဆေး', 'description' => 'စိုက်ခင်းတစ်လွှာကင်းစင်'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'ရွက်ဖျန်းအားဆေးများ',
                'description' => 'အပင်ပေါ်မှရေစိုထိန်းသိမ်းပြီး ဗိုင်းရပ်စ်နှင့်အန္တရာယ်မှကင်းစေရန်အသုံးပြုသည်',
                'products' => [
                    ['name' => 'ရွက်ဖျန်းသဘာဝဆေး', 'description' => 'သဘာဝပစ္စည်းဖြင့်ပြုလုပ်'],
                    ['name' => 'ရွက်တောက်ဖျန်းဆေး', 'description' => 'ရွက်ကိုတောက်ပစေ'],
                    ['name' => 'ရွက်ဖုံးဖျန်းဆေး', 'description' => 'ရွက်အနှံ့ဖုံးလွှမ်း'],
                    ['name' => 'အနံ့လေးရွက်ဖျန်းဆေး', 'description' => 'မွှေးနံ့သက်သာ'],
                    ['name' => 'အပင်ခံနွမ်းဖျန်းဆေး', 'description' => 'ပင်စည်ကိုအားကောင်းစေ'],
                ],
                'children' => [
                    [
                        'name' => 'ဖျန်းရည်ပျစ်ဖျစ်များ',
                        'description' => 'အပင်အလှဆင်မှုအတွက်ဖျန်းရည်များ',
                        'products' => [
                            ['name' => 'ရွက်စိုထိန်းဖျန်းဆေး', 'description' => 'ရွက်ကိုစိုစိုပြေပြေစေ'],
                            ['name' => 'ရွက်ကင်းလှဖျန်းဆေး', 'description' => 'ရွက်အတွင်းအနာအဆာပျောက်'],
                            ['name' => 'ရွက်တောက်တောက်ဖျန်းဆေး', 'description' => 'နီစိမ်းတောက်ပစေ'],
                            ['name' => 'ရွက်မန့်ဖျန်းဆေး', 'description' => 'ခြောက်သွေ့မှုကင်းစေ'],
                            ['name' => 'ရွက်ရောင်စုံဖျန်းဆေး', 'description' => 'ရောင်စုံပန်းတိုင်ဆန်'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ဗိုင်းရပ်စ်ကင်းဆေး',
                        'description' => 'ရွက်ပေါ်ရှိဗိုင်းရပ်စ်နှင့်ပိုးမွှားဖယ်ရှားရေး',
                        'products' => [
                            ['name' => 'ရွက်ဗိုင်းရပ်စ်ဖျက်ဆေး', 'description' => 'ရွက်ထဲကဗိုင်းရပ်စ်ဖယ်'],
                            ['name' => 'ပင်စည်ဗိုင်းရပ်စ်ကင်းဖျန်း', 'description' => 'ပင်စည်တစ်လျှောက်ကင်း'],
                            ['name' => 'သီးပွင့်ဗိုင်းရပ်စ်ဖျက်ဆေး', 'description' => 'သီးပွင့်ကင်းစေ'],
                            ['name' => 'ရေစိုထိန်းဖျန်း', 'description' => 'ရေစိုထိန်းတားဆေး'],
                            ['name' => 'ပိုးကင်းဗိုင်းရပ်စ်ကင်းဖျန်း', 'description' => 'ပိုးမွှားကင်းစေသောဖျန်း'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'မျိုးစေ့လူးနယ်ဆေးများ',
                'description' => 'မျိုးစေ့များကိုရောစပ်သုံးပြီးအရည်အသွေးကောင်းမွန်သောစိုက်ပျိုးမှုရရှိစေသည်',
                'products' => [
                    ['name' => 'စပါးမျိုးစေ့လူးနယ်ဆေး', 'description' => 'စပါးသီးနှံအတွက်'],
                    ['name' => 'ပဲမျိုးစေ့နယ်ဆေး', 'description' => 'ပဲမျိုးစေ့အတွက်'],
                    ['name' => 'မတ်မတ်မျိုးစေ့ဖျက်ဆေး', 'description' => 'ပိုးမွှားကင်းစေရန်'],
                    ['name' => 'နွားမြှားမျိုးစေ့အာဟာရ', 'description' => 'သက်တမ်းရှည်စေ'],
                    ['name' => 'ခရမ်းချဉ်မျိုးစေ့နယ်ဆေး', 'description' => 'ဟင်းသီးအတွက်အထူး'],
                ],
                'children' => [
                    [
                        'name' => 'စပါးမျိုးစေ့အတွက်',
                        'description' => 'စပါးမျိုးစေ့များကိုအနာအဆာကင်းစေရန်နယ်သည်',
                        'products' => [
                            ['name' => 'စပါးမျိုးစေ့မန့်ဆေး', 'description' => 'မျိုးစေ့ချိန်ထိန်း'],
                            ['name' => 'စပါးပိုးကင်းနယ်ဆေး', 'description' => 'စပါးပိုးပင်စွဲမနေစေ'],
                            ['name' => 'မျိုးစေ့အာဟာရမြှင့်ဆေး', 'description' => 'တောင့်တင်းစေ'],
                            ['name' => 'မျိုးစေ့စိုထိန်းနယ်ဆေး', 'description' => 'စိုထိန်းစွာထွက်လာ'],
                            ['name' => 'မျိုးစေ့စိုက်မှုမြှင့်တင်ဆေး', 'description' => 'စိုက်ရာတွင်ထွက်률ကောင်း'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ဟင်းသီးဟင်းရွက်မျိုးစေ့အတွက်',
                        'description' => 'ပန်းသီးဟင်းသီးမျိုးစေ့များအတွက်နယ်ဆေးများ',
                        'products' => [
                            ['name' => 'မန်ကျည်းမျိုးစေ့နယ်ဆေး', 'description' => 'ပိုးမွှားကင်းစင်'],
                            ['name' => 'ခရမ်းချဉ်မျိုးစေ့နယ်ဆေး', 'description' => 'ပန်းထွက်မြန်'],
                            ['name' => 'ငှက်ပျောမျိုးစေ့နယ်ဆေး', 'description' => 'အမြစ်ကြီးစေ'],
                            ['name' => 'သခွားမျိုးစေ့နယ်ဆေး', 'description' => 'အခြေခံစိုက်ခင်းကောင်း'],
                            ['name' => 'နာနတ်မျိုးစေ့နယ်ဆေး', 'description' => 'သက်တမ်းရှည်'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'စွဲကပ်ပြန့်နှံ့ဆေးများ',
                'description' => 'ဖျန်းဆေးများကိုအပင်ပေါ်တွင်ကောင်းစွာစွဲကပ်စေပြီး၊ ရေဖွဲ့ခြင်းမရှိစေသောဆေးများ',
                'products' => [
                    ['name' => 'စွဲကပ်ဆေးအပြည့်အဝ', 'description' => 'တစ်ခါဖျန်းလျှင်အသုံးတော်'],
                    ['name' => 'ပျစ်ထူစွဲကပ်ဆေး', 'description' => 'အပင်ပေါ်တွင်ကြာရှည်တည်'],
                    ['name' => 'ရေဖွဲ့ခံနိုင်သောစွဲကပ်ဆေး', 'description' => 'မိုးရွာလျှင်လည်းမပျက်'],
                    ['name' => 'နည်းလမ်းပိုင်းပြန့်နှံ့ဆေး', 'description' => 'အပင်လုံးကျွံသွားသည်'],
                    ['name' => 'အပင်ရေစိုခံစွဲကပ်ဆေး', 'description' => 'မိုးလွှမ်းမှုကင်း'],
                ],
                'children' => [
                    [
                        'name' => 'ပိုးဖျက်ဖျန်းအတွက်',
                        'description' => 'ပိုးသတ်ဆေးများအတွက်စွဲကပ်အကျိုးမြှင့်ဆေးများ',
                        'products' => [
                            ['name' => 'စွဲကပ်ပိုးဖျက်ဖျန်းဆေး', 'description' => 'ပိုးသတ်ဖျန်းများကောင်းစွာစွဲ'],
                            ['name' => 'ရေစိုခံပိုးဖျက်ဖျန်း', 'description' => 'မိုးကြောင့်မပျက်'],
                            ['name' => 'ပျစ်ပျစ်ဖျန်းဆေး', 'description' => 'အနံ့နဲ့အတူထိရောက်'],
                            ['name' => 'ဖျန်းဖုံးတိကျစွဲကပ်ဆေး', 'description' => 'အရွက်အပင်အနှံ့'],
                            ['name' => 'မျှတစွာပြန့်နှံ့ဖျန်းဆေး', 'description' => 'တစ်ပြင်လုံးတိကျ'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'အာဟာရဖျန်းအတွက်',
                        'description' => 'အပင်အားအတွက်ဖျန်းဆေးများစွဲကပ်ရန်',
                        'products' => [
                            ['name' => 'အာဟာရစွဲကပ်ဆေး', 'description' => 'အာဟာရပျံ့နှံ့ကောင်း'],
                            ['name' => 'စွဲကပ်အာဟာရဖျန်း', 'description' => 'အပင်အားကောင်း'],
                            ['name' => 'မြင့်မားစွဲကပ်ဖျန်း', 'description' => 'ပြည့်စုံစွာတင်ပေး'],
                            ['name' => 'စွဲကပ်ရေစိုခံဖျန်း', 'description' => 'မိုးရေမထိခိုက်'],
                            ['name' => 'အပင်အသက်အာဟာရဖျန်း', 'description' => 'အပင်အားကောင်းပြီးရင့်စေ'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'မျိုးစေ့များ',
                'description' => 'စိုက်ပျိုးမှုအတွက်အထူးရွေးချယ်ထားသောအရည်အသွေးမြင့်မျိုးစေ့များ',
                'products' => [
                    ['name' => 'စပါးမျိုးစေ့', 'description' => 'သီးနှံအထွက်မြင့်စပါးမျိုး'],
                    ['name' => 'ပဲမျိုးစေ့', 'description' => 'မြက်မွှားပဲမျိုး'],
                    ['name' => 'ခရမ်းချဉ်မျိုးစေ့', 'description' => 'အရောင်တောက်ပြီးသီးကောင်း'],
                    ['name' => 'မန်ကျည်းမျိုးစေ့', 'description' => 'အချဉ်ပြုလုပ်ရာတွင်သင့်တော်'],
                    ['name' => 'ငှက်ပျောမျိုးစေ့', 'description' => 'သီးတည်ကြာ'],
                ],
                'children' => [
                    [
                        'name' => 'စပါးမျိုးစေ့များ',
                        'description' => 'စိုက်ပျိုးမှုအတွက်သင့်လျော်သောစပါးမျိုးစုံ',
                        'products' => [
                            ['name' => 'စပါး (90 ရက်)', 'description' => 'အချိန်တိုအတွက်'],
                            ['name' => 'စပါး (120 ရက်)', 'description' => 'ထွက်ရည်ကောင်း'],
                            ['name' => 'ပင်တိုစပါး', 'description' => 'မိုးရေခံ'],
                            ['name' => 'ပင်မြင့်စပါး', 'description' => 'ရေငတ်ခံ'],
                            ['name' => 'အပင်ရှည်စပါး', 'description' => 'အညွှန်းအရည်အသွေးမြင့်'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ဟင်းသီးဟင်းရွက်မျိုးစေ့များ',
                        'description' => 'အစားအသောက်အတွက်သီးနှံများ',
                        'products' => [
                            ['name' => 'ခရမ်းချဉ်', 'description' => 'သီးကြီး'],
                            ['name' => 'သခွား', 'description' => 'တည်ကြာ'],
                            ['name' => 'နွားနီသီး', 'description' => 'အရသာရှိ'],
                            ['name' => 'ငှက်ပျော', 'description' => 'ရင်ကြီး'],
                            ['name' => 'တရွက်သီး', 'description' => 'ကောင်းမွန်'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'ပိုးမွှားကင်းရှင်းရေးဆေးများ',
                'description' => 'ခြံမြေ၊ အိမ်ဝင်းအတွင်းရှိပိုးမွှားများဖယ်ရှားရေးဆေးများ',
                'products' => [
                    ['name' => 'အိမ်ပိုးသတ်ဆေး', 'description' => 'အိမ်အတွင်းတိကျ'],
                    ['name' => 'ခြံဝင်းဖျန်းဆေး', 'description' => 'ပတ်ဝန်းကျင်သန့်'],
                    ['name' => 'ပိုးသတ်ဖျန်းဆေး', 'description' => 'ပိုးမွှားအားဖြင့်ကြပ်မတ်'],
                    ['name' => 'ဖမ်းပိုးကပ်ကပ်', 'description' => 'ပိုးစွဲဖမ်း'],
                    ['name' => 'အနံ့ဆိုးဖျက်ဆေး', 'description' => 'သန့်ရှင်းမွှေး'],
                ],
                'children' => [
                    [
                        'name' => 'အိမ်သုံးပိုးဖျက်ဆေးများ',
                        'description' => 'အိမ်တွင်းနှင့်အိမ်ဝန်းအတွက်',
                        'products' => [
                            ['name' => 'ကြောင်ထိတွေ့မူနည်းပိုးသတ်ဆေး', 'description' => 'တိရစ္ဆာန်နှင့်လုံခြုံ'],
                            ['name' => 'ပျားသတ်ဖျန်း', 'description' => 'ပျားစွဲခြင်းကင်း'],
                            ['name' => 'မွှားဖမ်းဆေး', 'description' => 'အနံ့နဲ့ဖမ်း'],
                            ['name' => 'ပိုးကပ်ကပ်ခွက်', 'description' => 'အိမ်လှေအတွင်းအတွက်'],
                            ['name' => 'အနံ့လှဆေး', 'description' => 'အနံ့ဆိုးမရှိ'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ခြံဝင်းသုံးပိုးဖျက်ဆေးများ',
                        'description' => 'ပြင်ပပတ်ဝန်းကျင်အတွက်',
                        'products' => [
                            ['name' => 'ပိုးသတ်မီးဖို', 'description' => 'မီးအပူဖြင့်'],
                            ['name' => 'ပိုးသတ်ခြောက်', 'description' => 'တစ်နေကုန်'],
                            ['name' => 'အနံ့ပျံ့ဖျက်ဖျန်း', 'description' => 'တစ်ပြင်လုံး'],
                            ['name' => 'သစ်ပင်အတွက်ဖျန်း', 'description' => 'သစ်ပင်တစ်လျှောက်'],
                            ['name' => 'ခြံနယ်သုံးဖျန်း', 'description' => 'ဝင်းနယ်အတွင်း'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'စိုက်ပျိုးရေးစက်ကိရိယာများ',
                'description' => 'မြေဖျော်ခြင်း၊ စိုက်ပျိုးခြင်းနှင့် ရိတ်သိမ်းရေးသုံးစက်ကိရိယာများ',
                'products' => [
                    ['name' => 'မြေဆင်းစက်', 'description' => 'မြေပေါ်ပျော်တတ်'],
                    ['name' => 'စပါးရိတ်စက်', 'description' => 'မြန်မြန်ရိတ်'],
                    ['name' => 'အမြစ်ဖောက်စက်', 'description' => 'မြစ်ပြန်မကျန်'],
                    ['name' => 'ရေဖြန်းစက်', 'description' => 'ဖျန်းစနစ်'],
                    ['name' => 'အမျိုးမျိုးစက်ကိရိယာအထုပ်', 'description' => 'စုစည်းပါ'],
                ],
                'children' => [
                    [
                        'name' => 'မြေဆင်းစက်များ',
                        'description' => 'စိုက်ခင်းအတွက်မြေပြင်ဖျော်စက်များ',
                        'products' => [
                            ['name' => 'လက်ကမ်းစက်', 'description' => 'အသေးစား'],
                            ['name' => 'တစ်လွှာဖျော်စက်', 'description' => 'မြေပေါ်ဖျော်'],
                            ['name' => 'မြစ်ဖောက်စက်', 'description' => 'အောက်ခံပြင်'],
                            ['name' => 'နယ်နိမိတ်စက်', 'description' => 'နယ်သတ်တစ်ဖက်'],
                            ['name' => 'မူဘီစက်', 'description' => 'စက်စပ်ဖျော်'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ရိတ်သိမ်းစက်များ',
                        'description' => 'သီးနှံကောင်းကောင်းရိတ်ဖို့',
                        'products' => [
                            ['name' => 'စပါးရိတ်စက်', 'description' => 'စပါးအတွက်'],
                            ['name' => 'ပဲရိတ်စက်', 'description' => 'ပဲအတွက်'],
                            ['name' => 'သီးသန့်အပင်ရိတ်စက်', 'description' => 'ဖျော့ဖျော့မရိတ်'],
                            ['name' => 'မော်တာဖျော်စက်', 'description' => 'အင်ဂျင်ဖြင့်'],
                            ['name' => 'သယ်ယူပစ္စည်းစက်', 'description' => 'ရိတ်ပြီးသယ်'],
                        ],
                        'children' => []
                    ]
                ]
            ],
            [
                'name' => 'မွေးမြူရေးအတွက်အစားအစာများ',
                'description' => 'တိရစ္ဆာန်များအတွက်အာဟာရပြည့်စုံသောအစားအစာများ',
                'products' => [
                    ['name' => 'အမဲအစာ', 'description' => 'အာဟာရပြည့်စုံ'],
                    ['name' => 'ဝက်အစာ', 'description' => 'အရွယ်အစားတိုးစေ'],
                    ['name' => 'ကြက်အစာ', 'description' => 'ကြက်ဥထွက်မြှင့်တင်'],
                    ['name' => 'ငါးအစာ', 'description' => 'ရေထဲတွင်မပျက်'],
                    ['name' => 'မြီးအစာ', 'description' => 'တစ်နေ့တစ်ကြိမ်'],
                ],
                'children' => [
                    [
                        'name' => 'ကြက်မွေးမြူရေးအစာများ',
                        'description' => 'ကြက်တောင်နက်အတွက်အစာရွေးချယ်မှု',
                        'products' => [
                            ['name' => 'ကြက်ဥထွက်မြင့်အစာ', 'description' => 'အနံ့သက်သာ'],
                            ['name' => 'ကြက်သားကြီးစေသောအစာ', 'description' => 'သားအရွယ်ကြီး'],
                            ['name' => 'ကြက်လေးအစာ', 'description' => 'အရွယ်ဖွံ့'],
                            ['name' => 'နို့တောင်ကြက်အစာ', 'description' => 'အာဟာရနည်းထောက်ပံ့'],
                            ['name' => 'ကြက်ဖျော့အစာ', 'description' => 'အသုံးအဆောင်'],
                        ],
                        'children' => []
                    ],
                    [
                        'name' => 'ငါးမွေးမြူရေးအစာများ',
                        'description' => 'ရေကြောင်းတွင်မပျက်အစာ',
                        'products' => [
                            ['name' => 'ငါးကြီးအတွက်အစာ', 'description' => 'သားလေးသန်'],
                            ['name' => 'ငါးမွေးဖွားအစာ', 'description' => 'အသစ်မွေးငါး'],
                            ['name' => 'ငါးအဖျော်အစာ', 'description' => 'တည်ကြာစွမ်းအား'],
                            ['name' => 'ရေဖောက်မပျက်အစာ', 'description' => 'စွဲကပ်'],
                            ['name' => 'ပန်းငါးအစာ', 'description' => 'အရောင်တောက်ပ'],
                        ],
                        'children' => []
                    ]
                ]
            ]
        ];

        require('p.php');

        // require('data.php');
        // var_dump($categories);
        foreach ($categories as $categoryData) {
            $mainCategory = Category::factory()->create([
                "name" => $categoryData["name"],
                "description" => $categoryData["description"],
                "image" => '/storage/categories/' . $categoryData['image']
            ]);
            foreach ($categoryData['products'] as $productData) {
                $product = Product::factory()
                    ->create([
                        'category_id' => $mainCategory->id,
                        'name' => $productData['name'],
                        'description' => $productData['description'],
                        'price' => $productData['price'],
                        'unit' => $productData['unit'],
                    ]);

                foreach ($productData['images'] as $i => $image) {
                    // var_dump($image);
                    ProductImage::factory()
                        ->create(['product_id' => $product->id, 'path' => '/storage/product_images/' . $image, 'is_default' => $i === 0]);
                }
            }

            $subcategories = $categoryData['children'];
            foreach ($subcategories as $categoryData) {
                $category = Category::factory()->create([
                    "name" => $categoryData["name"],
                    "description" => $categoryData["description"],
                    'parent_id' => $mainCategory->id,
                    "image" => '/storage/categories/' . $categoryData['image']
                ]);

                foreach ($categoryData['products'] as $productData) {
                    $product = Product::factory()
                        ->create([
                            'category_id' => $category->id,
                            'name' => $productData['name'],
                            'description' => $productData['description'],
                            'price' => $productData['price'],
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
            for ($i = 0; $i < rand(2, 5); $i++) {
                Review::factory()
                    ->create([
                        'product_id' => $product->id,
                        'user_id' => User::where('role', 'customer')->inRandomOrder()->first()->id,
                        'created_at' => getRandomDate(90)
                    ]);
            }
        });

        User::all()->each(function ($user) {
            Address::factory(2)->create([
                'user_id' => $user->id,
                'type' => 'shipping',
                'full_name' => $user->name,
                'phone' => $user->phone
            ]);

            Address::factory()->create([
                'user_id' => $user->id,
                'type' => 'billing',
                'is_default' => true,
                'full_name' => $user->name,
                'phone' => $user->phone
            ]);
        });

        User::where('role', 'customer')->get()->each(function ($user) {
            for ($i = 0; $i < 10; $i++) {
                $date = getRandomDate(90);
                $order = Order::factory()->create([
                    'user_id' => $user->id,
                    'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
                    'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
                    'status' => 'delivered',
                    'created_at' => $date,
                ]);

                OrderItem::factory(2)->create([
                    'order_id' => $order->id,
                    'product_id' => Product::inRandomOrder()->first()->id,
                    'created_at' => $date,
                ]);
            }

            $date = getRandomDate(90);
            $order = Order::factory()->create([
                'user_id' => $user->id,
                'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
                'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
                'status' => 'pending',
                'created_at' => $date,
            ]);
            OrderItem::factory(2)->create([
                'order_id' => $order->id,
                'product_id' => Product::inRandomOrder()->first()->id,
                'created_at' => $date,
            ]);

            $date = getRandomDate(90);
            $order = Order::factory()->create([
                'user_id' => $user->id,
                'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
                'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
                'status' => 'shipped',
                'created_at' => $date,
            ]);
            OrderItem::factory(2)->create([
                'order_id' => $order->id,
                'product_id' => Product::inRandomOrder()->first()->id,
                'created_at' => $date,
            ]);

            $date = getRandomDate(90);
            $order = Order::factory()->create([
                'user_id' => $user->id,
                'shipping_address_id' => Address::where(['user_id' => $user->id, 'type' => 'shipping'])->first(),
                'billing_address_id' => Address::where(['user_id' => $user->id, 'type' => 'billing'])->first(),
                'status' => 'cancelled',
                'created_at' => $date,
            ]);
            OrderItem::factory(2)->create([
                'order_id' => $order->id,
                'product_id' => Product::inRandomOrder()->first()->id,
                'created_at' => $date,
            ]);
        });

        // Discount::factory(5)->create();

        User::where('role', 'customer')->each(function ($user) {
            // Generate a random number of items to create (between 1 and 5)
            $numOfItems = rand(1, 5);

            // Create unique combinations of user and product
            $products = Product::inRandomOrder()->take($numOfItems)->get();

            foreach ($products as $product) {
                // Ensure the combination of user and product is unique
                if (!Wishlist::where('user_id', $user->id)->where('product_id', $product->id)->exists()) {
                    Wishlist::create([
                        'user_id' => $user->id,
                        'product_id' => $product->id,
                    ]);
                }
            }
        });
    }
}
