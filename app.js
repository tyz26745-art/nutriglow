/* ════════════════════════════════════════════════
   NutriDish — app.js
   Full application logic with real Unsplash images
════════════════════════════════════════════════ */

'use strict';

/* ── DIET DATA ── */
const DIETS = [
  { id:'vegan',        name:'Vegan',             img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', desc:'100% plant-based, no animal products', tag:'Plant-Based', tagBg:'#E8F5E9', tagColor:'#2E7D32' },
  { id:'keto',         name:'Keto',              img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', desc:'High fat, very low carbohydrate diet', tag:'Low-Carb', tagBg:'#F3E5F5', tagColor:'#6A1B9A' },
  { id:'high-protein', name:'High Protein',      img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', desc:'Muscle building, protein-rich meals', tag:'Muscle Fuel', tagBg:'#FBE9E7', tagColor:'#BF360C' },
  { id:'low-calorie',  name:'Low Calorie',       img:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', desc:'Under 400 kcal per serving', tag:'Light', tagBg:'#E0F2F1', tagColor:'#00695C' },
  { id:'diabetic',     name:'Diabetic Friendly', img:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80', desc:'Low glycemic index, balances blood sugar', tag:'GI-Safe', tagBg:'#E3F2FD', tagColor:'#1565C0' },
  { id:'vegetarian',   name:'Vegetarian',        img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', desc:'No meat, includes dairy & eggs', tag:'Veggie', tagBg:'#F9FBE7', tagColor:'#558B2F' },
  { id:'gluten-free',  name:'Gluten Free',       img:'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80', desc:'Safe for celiac & gluten sensitivity', tag:'GF', tagBg:'#FFF3E0', tagColor:'#E65100' },
  { id:'low-carb',     name:'Low Carb',          img:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80', desc:'Reduced carbs for metabolic health', tag:'Low Carb', tagBg:'#EDE7F6', tagColor:'#4A148C' },
  { id:'weight-loss',  name:'Weight Loss',       img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', desc:'Calorie-controlled, satisfying meals', tag:'Slim', tagBg:'#E0F7FA', tagColor:'#00838F' },
  { id:'heart-healthy',name:'Heart Healthy',     img:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80', desc:'Low sodium, healthy fats for your heart', tag:'Cardio', tagBg:'#FFEBEE', tagColor:'#C62828' },
  { id:'children',     name:'Children 1–5 yrs',  img:'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80', desc:'Nutritious, soft, kid-friendly meals', tag:'Kids', tagBg:'#FFFDE7', tagColor:'#F57F17' },
];

/* ── RECIPE DATA (with real Unsplash images) ── */
const BASE_RECIPES = [
  /* ══ VEGAN ══ */
  { id:1, name:'Green Smoothie Bowl', img:'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80', diet:'vegan', time:'10 min', servings:1, difficulty:'Easy', calories:280, protein:8, carbs:52, fat:6, likeCount:24,
    ingredients:['1 frozen banana','1 cup fresh spinach','½ cup mango chunks','½ cup coconut milk','2 tbsp rolled oats','Toppings: fresh berries, granola, coconut flakes, chia seeds'],
    steps:['Blend frozen banana, spinach, mango, and coconut milk until thick and smooth.','Pour into a wide bowl.','Arrange toppings: rolled oats, fresh berries, granola, coconut flakes, and chia seeds.','Serve immediately cold.'] },
  { id:2, name:'Chickpea Tikka Masala', img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', diet:'vegan', time:'35 min', servings:4, difficulty:'Medium', calories:340, protein:15, carbs:45, fat:10, likeCount:41,
    ingredients:['2 cans chickpeas (drained)','1 can coconut milk','1 can crushed tomatoes','1 onion (diced)','3 garlic cloves','1 tbsp fresh ginger','2 tbsp tikka masala spice blend','1 tbsp olive oil','Salt to taste','Fresh cilantro to garnish'],
    steps:['Heat olive oil in a large pan, sauté onion for 5 minutes until softened.','Add garlic and ginger, stir-fry for 2 minutes.','Add tikka masala spice and stir for 1 minute until fragrant.','Pour in crushed tomatoes and simmer for 10 minutes.','Add chickpeas and coconut milk, simmer 15 minutes.','Season with salt, garnish with fresh cilantro. Serve over basmati rice.'] },
  { id:3, name:'Avocado Toast Supreme', img:'https://images.unsplash.com/photo-1603046891744-76e0e7dcecdd?w=600&q=80', diet:'vegan', time:'10 min', servings:2, difficulty:'Easy', calories:310, protein:9, carbs:30, fat:18, likeCount:57,
    ingredients:['2 slices sourdough bread','1 ripe avocado','Juice of ½ lemon','Salt and black pepper','Pinch of red pepper flakes','Cherry tomatoes (halved)','Microgreens or sprouts','Everything bagel seasoning'],
    steps:['Toast bread slices until golden and crisp.','Halve avocado, remove pit, scoop into bowl.','Mash with lemon juice, salt and pepper until creamy.','Spread generously on toast.','Top with halved cherry tomatoes and microgreens.','Finish with everything bagel seasoning and red pepper flakes.'] },

  /* ══ KETO ══ */
  { id:4, name:'Bacon & Egg Cups', img:'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80', diet:'keto', time:'22 min', servings:4, difficulty:'Easy', calories:290, protein:18, carbs:2, fat:22, likeCount:38,
    ingredients:['8 slices streaky bacon','8 large eggs','½ cup shredded cheddar cheese','2 tbsp fresh chives (chopped)','Salt & freshly cracked pepper','Cooking spray or butter for greasing'],
    steps:['Preheat oven to 375°F (190°C). Lightly grease a muffin tin.','Line each muffin cup with one bacon slice, pressing it to the walls.','Carefully crack one egg into each bacon cup.','Sprinkle shredded cheddar and chives over eggs.','Season with salt and pepper.','Bake 15–18 minutes until egg whites are set but yolks remain slightly soft. Serve hot.'] },
  { id:5, name:'Zucchini Noodles Alfredo', img:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80', diet:'keto', time:'25 min', servings:2, difficulty:'Medium', calories:380, protein:14, carbs:8, fat:32, likeCount:29,
    ingredients:['3 medium zucchinis (spiralized)','1 cup heavy cream','3 garlic cloves (minced)','½ cup freshly grated parmesan','2 tbsp unsalted butter','Salt, pepper, pinch of nutmeg','Fresh flat-leaf parsley'],
    steps:['Spiralize zucchini and pat dry with paper towels.','Melt butter in a wide pan over medium heat, add garlic and cook 2 minutes.','Pour in heavy cream and bring to a gentle simmer.','Stir in parmesan and nutmeg until sauce thickens.','Season generously with salt and pepper.','Toss zucchini noodles through the sauce for 1–2 minutes. Serve immediately with parsley.'] },
  { id:6, name:'Cauliflower Fried Rice', img:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', diet:'keto', time:'20 min', servings:4, difficulty:'Easy', calories:210, protein:10, carbs:10, fat:14, likeCount:45,
    ingredients:['1 large cauliflower head (riced)','2 large eggs','½ cup frozen peas & carrots','3 tbsp soy sauce or tamari','2 tbsp sesame oil','3 garlic cloves (minced)','2 green onions (sliced)','1 tsp fresh ginger'],
    steps:['Rice the cauliflower in a food processor until it resembles coarse rice.','Heat sesame oil in a large wok over high heat.','Add garlic and ginger, stir-fry 1 minute until fragrant.','Add peas and carrots, cook for 3 minutes.','Push to the side, crack in eggs and scramble.','Add cauliflower rice and soy sauce, toss everything together and cook 4 minutes. Garnish with green onions.'] },

  /* ══ HIGH PROTEIN ══ */
  { id:7, name:'Grilled Chicken Bowl', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80', diet:'high-protein', time:'30 min', servings:2, difficulty:'Easy', calories:420, protein:48, carbs:28, fat:12, likeCount:63,
    ingredients:['2 chicken breasts (250g each)','1 cup brown rice (cooked)','1 cup broccoli florets','1 cup cherry tomatoes','½ cup Greek yogurt (for dressing)','1 tbsp olive oil','Lemon, garlic, mixed herbs','Salt & pepper'],
    steps:['Marinate chicken breasts in lemon juice, garlic, olive oil, and herbs for 15 minutes.','Grill on medium-high heat 6–7 minutes each side until cooked through.','Steam broccoli florets for 5 minutes until tender-crisp.','Rest chicken 5 minutes, then slice diagonally.','Assemble bowls: brown rice base, sliced chicken, broccoli, cherry tomatoes.','Drizzle with Greek yogurt dressing seasoned with lemon and herbs.'] },
  { id:8, name:'Tuna Protein Salad', img:'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=80', diet:'high-protein', time:'10 min', servings:2, difficulty:'Easy', calories:310, protein:36, carbs:12, fat:14, likeCount:22,
    ingredients:['2 cans tuna in water (drained)','2 tbsp Greek yogurt','1 tbsp Dijon mustard','1 celery stalk (finely diced)','¼ red onion (finely diced)','1 tbsp capers','Juice of ½ lemon','Salt & black pepper','Mixed salad greens'],
    steps:['Drain tuna well and flake into a mixing bowl.','Add Greek yogurt, Dijon mustard, capers, and lemon juice. Mix well.','Fold in celery and red onion.','Season with salt and pepper to taste.','Serve over a bed of mixed salad greens.','Add whole grain crackers or serve in lettuce cups if desired.'] },
  { id:9, name:'Egg White Omelette', img:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80', diet:'high-protein', time:'12 min', servings:1, difficulty:'Easy', calories:180, protein:22, carbs:6, fat:6, likeCount:18,
    ingredients:['5 large egg whites','½ cup fresh baby spinach','¼ cup mushrooms (sliced)','¼ cup mixed bell peppers (diced)','2 tbsp low-fat feta cheese','Salt, pepper, Italian herbs','1 tsp olive oil'],
    steps:['Whisk egg whites with a pinch of salt, pepper, and Italian herbs until frothy.','Heat olive oil in a non-stick pan over medium heat.','Sauté mushrooms and bell peppers for 3 minutes.','Add spinach and cook until wilted, about 1 minute.','Pour egg whites over the vegetables, cook on medium-low.','Lift the edges allowing uncooked whites to flow under. Add feta, fold and serve.'] },

  /* ══ LOW CALORIE ══ */
  { id:10, name:'Garden Vegetable Soup', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80', diet:'low-calorie', time:'40 min', servings:4, difficulty:'Easy', calories:120, protein:5, carbs:22, fat:2, likeCount:31,
    ingredients:['1 medium zucchini (diced)','2 medium carrots (diced)','2 celery stalks (diced)','1 can diced tomatoes','1 cup green beans (trimmed)','4 cups low-sodium vegetable broth','1 onion (diced)','3 garlic cloves (minced)','Italian herb blend','Salt & pepper'],
    steps:['Dice all vegetables into uniform bite-sized pieces.','Sauté onion and garlic in a splash of olive oil for 5 minutes.','Add carrots and celery, cook another 5 minutes.','Pour in broth and diced tomatoes, bring to a simmer.','Add zucchini and green beans, stir in Italian herbs.','Simmer on low heat for 20 minutes until all vegetables are tender. Season and serve.'] },
  { id:11, name:'Greek Salad Wrap', img:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', diet:'low-calorie', time:'10 min', servings:1, difficulty:'Easy', calories:250, protein:12, carbs:28, fat:9, likeCount:44,
    ingredients:['1 whole wheat tortilla (large)','½ cup cucumber (diced)','½ cup cherry tomatoes (halved)','¼ cup crumbled feta cheese','¼ cup Kalamata olives (pitted)','2 tbsp hummus','Handful fresh baby spinach','¼ red onion (thinly sliced)','Dried oregano, black pepper'],
    steps:['Lay the tortilla flat and spread hummus evenly over the surface.','Layer fresh spinach leaves over the hummus.','Add cucumber, cherry tomatoes, and olives.','Crumble feta cheese on top.','Add thin red onion slices.','Sprinkle dried oregano and black pepper. Wrap tightly, cut diagonally, and serve.'] },

  /* ══ DIABETIC ══ */
  { id:12, name:'Quinoa Buddha Bowl', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', diet:'diabetic', time:'30 min', servings:2, difficulty:'Easy', calories:350, protein:14, carbs:42, fat:14, likeCount:27,
    ingredients:['1 cup quinoa (dry, rinsed)','1 cup sweet potato (cubed, roasted)','1 cup curly kale (massaged with lemon)','½ cup chickpeas (roasted & spiced)','¼ ripe avocado','2 tbsp tahini dressing','Lemon juice & zest','Pumpkin seeds for topping'],
    steps:['Cook quinoa in 2 cups salted water for 15 minutes, fluff and cool.','Roast sweet potato cubes at 400°F (200°C) for 25 minutes until caramelised.','Roast chickpeas tossed in cumin & paprika at 400°F for 20 minutes.','Massage kale with lemon juice and a pinch of salt until softened.','Build bowls: quinoa base, all toppings arranged in sections.','Drizzle with tahini dressing, add pumpkin seeds.'] },
  { id:13, name:'Lentil Vegetable Stew', img:'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80', diet:'diabetic', time:'45 min', servings:4, difficulty:'Medium', calories:290, protein:16, carbs:44, fat:4, likeCount:19,
    ingredients:['1.5 cups red lentils (rinsed)','2 tomatoes (diced)','1 large onion (diced)','3 garlic cloves','2 medium carrots (sliced)','2 cups baby spinach','4 cups low-sodium vegetable broth','1 tsp cumin, turmeric, coriander each','1 tsp olive oil','Salt & fresh lemon juice'],
    steps:['Rinse lentils under cold water until water runs clear.','Sauté onion and garlic in olive oil for 5 minutes.','Add ground spices and stir for 1 minute until toasted.','Add lentils, tomatoes, and broth. Bring to boil, reduce heat.','Simmer 20 minutes, add carrots in the last 15 minutes.','Stir in spinach in the final 2 minutes. Season with salt and lemon. Serve with crusty bread.'] },

  /* ══ VEGETARIAN ══ */
  { id:14, name:'Paneer Butter Masala', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', diet:'vegetarian', time:'40 min', servings:4, difficulty:'Medium', calories:390, protein:16, carbs:24, fat:26, likeCount:72,
    ingredients:['300g paneer (cubed)','1 can whole tomatoes','1 large onion (diced)','10 cashews','¼ cup heavy cream','3 tbsp unsalted butter','2 tsp garam masala, cumin, chili powder','2 tbsp ginger-garlic paste','½ tsp sugar','Fresh cream & coriander to garnish'],
    steps:['Sauté onion and cashews in butter until golden brown.','Add ginger-garlic paste and cook 2 minutes.','Add whole tomatoes and simmer 15 minutes.','Cool slightly and blend the sauce until very smooth.','Return to pan, melt more butter, add spices and stir.','Pour in blended sauce, simmer 10 minutes. Add paneer and cream. Cook 5 minutes. Garnish and serve with naan.'] },
  { id:15, name:'Mushroom Stroganoff', img:'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&q=80', diet:'vegetarian', time:'30 min', servings:4, difficulty:'Medium', calories:340, protein:12, carbs:38, fat:16, likeCount:35,
    ingredients:['500g mixed mushrooms (sliced)','1 onion (diced)','3 garlic cloves (minced)','1 cup sour cream','1 cup vegetable broth','2 tbsp butter','1 tbsp plain flour','1 tsp smoked paprika, fresh thyme','Salt & pepper','Egg noodles or rice to serve'],
    steps:['Melt butter in a wide pan, sauté onion until translucent, about 5 minutes.','Add garlic and mushrooms. Cook on high heat until mushrooms are golden, 8 minutes.','Sprinkle flour over mushrooms and stir for 1 minute.','Pour in vegetable broth, stir to combine. Simmer 10 minutes.','Reduce heat to low, fold in sour cream — do not boil or it will split.','Add paprika and thyme, season well. Serve over cooked egg noodles.'] },

  /* ══ GLUTEN FREE ══ */
  { id:16, name:'Rice Paper Spring Rolls', img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80', diet:'gluten-free', time:'25 min', servings:8, difficulty:'Medium', calories:180, protein:8, carbs:26, fat:4, likeCount:28,
    ingredients:['8 rice paper sheets (22cm)','100g rice vermicelli (cooked & cooled)','200g cooked shrimp or firm tofu','½ cucumber (julienned)','2 carrots (julienned)','½ ripe avocado (sliced)','Fresh mint and Thai basil leaves','Butter lettuce leaves','Sweet chilli or hoisin dipping sauce'],
    steps:['Cook rice vermicelli, drain and rinse under cold water.','Prepare all filling ingredients in separate small bowls.','Fill a wide shallow bowl with warm water.','Dip one rice paper sheet for about 10 seconds, place on a damp board.','Layer lettuce, noodles, protein, and vegetables in the lower third.','Fold bottom up, tuck in sides, roll tightly. Serve with dipping sauce.'] },
  { id:17, name:'Baked Salmon & Quinoa', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', diet:'gluten-free', time:'30 min', servings:2, difficulty:'Easy', calories:410, protein:38, carbs:32, fat:14, likeCount:51,
    ingredients:['2 salmon fillets (180g each)','1 cup quinoa (cooked)','1 lemon (sliced)','2 garlic cloves (minced)','2 tbsp extra-virgin olive oil','Fresh dill and flat-leaf parsley','200g asparagus spears','Salt & freshly cracked pepper'],
    steps:['Preheat oven to 400°F (200°C). Line a baking sheet with parchment.','Season salmon with minced garlic, olive oil, dill, salt and pepper.','Arrange salmon and asparagus on the baking sheet, top salmon with lemon slices.','Bake 15–18 minutes until salmon flakes easily with a fork.','While salmon bakes, cook quinoa and season with parsley and lemon zest.','Plate quinoa, lay salmon on top, add asparagus and drizzle with remaining lemon juice.'] },

  /* ══ LOW CARB ══ */
  { id:18, name:'Turkey Lettuce Wraps', img:'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&q=80', diet:'low-carb', time:'20 min', servings:4, difficulty:'Easy', calories:260, protein:28, carbs:8, fat:12, likeCount:33,
    ingredients:['500g lean ground turkey','8 large butter lettuce leaves','3 garlic cloves (minced)','1 small onion (finely diced)','2 tbsp coconut aminos or low-sodium soy sauce','1 tbsp sesame oil','½ cup water chestnuts (chopped)','3 green onions (sliced)','1 tsp fresh ginger (grated)'],
    steps:['Heat sesame oil in a large pan or wok over high heat.','Add garlic and ginger, stir-fry for 1 minute.','Add ground turkey, breaking it apart as it cooks, about 5 minutes.','Stir in onion and water chestnuts, cook 3 more minutes.','Pour in coconut aminos and toss to coat everything.','Spoon mixture into lettuce cups. Top with sliced green onions and serve immediately.'] },
  { id:19, name:'Steak & Veggie Skewers', img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', diet:'low-carb', time:'25 min', servings:4, difficulty:'Medium', calories:360, protein:32, carbs:10, fat:20, likeCount:47,
    ingredients:['500g sirloin steak (cut into 3cm cubes)','1 red bell pepper (cubed)','1 green zucchini (thick slices)','1 red onion (wedges)','Cherry tomatoes','2 tbsp olive oil','1 tsp garlic powder, smoked paprika','Salt & black pepper','Lemon juice to finish'],
    steps:['Cut steak and vegetables into similar sizes for even cooking.','Combine olive oil, garlic powder, paprika, salt and pepper in a bowl.','Toss steak cubes in the marinade. Thread steak and vegetables alternately on skewers.','Preheat grill or BBQ to high heat.','Grill skewers 3–4 minutes per side for medium doneness.','Rest 3 minutes, drizzle with lemon juice. Serve with tzatziki or herb yogurt.'] },

  /* ══ WEIGHT LOSS ══ */
  { id:20, name:'Overnight Oats', img:'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80', diet:'weight-loss', time:'5 min + overnight', servings:1, difficulty:'Easy', calories:320, protein:12, carbs:50, fat:8, likeCount:88,
    ingredients:['½ cup rolled oats (not instant)','¾ cup unsweetened almond milk','1 tbsp chia seeds','1 tbsp raw honey or maple syrup','½ tsp pure vanilla extract','¼ tsp cinnamon','Toppings: mixed berries, banana slices, chopped nuts'],
    steps:['Combine rolled oats and chia seeds in a mason jar or bowl.','Pour in almond milk. Add honey, vanilla extract, and cinnamon.','Stir well until everything is evenly mixed.','Seal the jar and refrigerate overnight, or minimum 4 hours.','In the morning, give it a good stir. Add a splash more milk if too thick.','Top with fresh berries, banana slices, and your favourite nuts. Enjoy straight from the jar!'] },
  { id:21, name:'Veggie Egg Muffins', img:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80', diet:'weight-loss', time:'30 min', servings:6, difficulty:'Easy', calories:90, protein:8, carbs:4, fat:5, likeCount:42,
    ingredients:['6 large eggs','½ cup red bell pepper (diced)','½ cup fresh spinach (roughly chopped)','¼ cup mushrooms (finely sliced)','¼ cup red onion (diced)','2 tbsp crumbled feta cheese','Salt, pepper, Italian seasoning','Cooking spray'],
    steps:['Preheat oven to 350°F (175°C). Spray a 6-cup muffin tin generously.','Whisk eggs together with salt, pepper, and Italian seasoning.','Divide diced vegetables evenly among the 6 muffin cups.','Pour egg mixture over the vegetables, filling ¾ of the way up.','Sprinkle crumbled feta on top of each cup.','Bake 20–22 minutes until eggs are fully set and tops are lightly golden. Cool 5 minutes, then pop out.'] },

  /* ══ HEART HEALTHY ══ */
  { id:22, name:'Mediterranean Bowl', img:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', diet:'heart-healthy', time:'20 min', servings:2, difficulty:'Easy', calories:380, protein:18, carbs:42, fat:14, likeCount:55,
    ingredients:['1 cup farro or pearl barley (cooked)','½ cup classic hummus','1 cup cherry tomatoes (halved)','½ cucumber (diced)','¼ cup Kalamata olives','¼ cup crumbled feta cheese','1 tbsp extra-virgin olive oil','Juice of 1 lemon','Dried oregano, fresh flat-leaf parsley'],
    steps:['Cook farro according to package instructions, season lightly.','Gently warm the hummus in a small saucepan or microwave.','Divide farro between two wide bowls.','Arrange hummus, cherry tomatoes, cucumber, and olives in sections.','Crumble feta over the top.','Drizzle with extra-virgin olive oil and lemon juice. Finish with dried oregano and fresh parsley.'] },
  { id:23, name:'Baked Cod with Veggies', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', diet:'heart-healthy', time:'35 min', servings:2, difficulty:'Easy', calories:290, protein:32, carbs:18, fat:8, likeCount:26,
    ingredients:['2 fresh cod fillets (200g each)','1 cup cherry tomatoes','1 medium zucchini (sliced)','1 yellow bell pepper (strips)','2 tbsp extra-virgin olive oil','3 garlic cloves (whole, crushed)','Fresh thyme and rosemary sprigs','1 lemon (half sliced, half for juice)','Sea salt & cracked pepper'],
    steps:['Preheat oven to 400°F (200°C).','Toss cherry tomatoes, zucchini, and pepper with olive oil, garlic, and herbs on a baking sheet.','Roast vegetables for 10 minutes.','Season cod fillets with sea salt, pepper, and lemon juice. Place on top of vegetables.','Lay lemon slices over the fish.','Bake a further 18–22 minutes until fish is opaque and flakes easily. Garnish with fresh herbs.'] },

  /* ══ CHILDREN ══ */
  { id:24, name:'Fluffy Mini Pancakes', img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', diet:'children', time:'20 min', servings:4, difficulty:'Easy', calories:195, protein:6, carbs:32, fat:5, likeCount:93,
    ingredients:['1 cup all-purpose flour','1 tbsp white sugar','1 tsp baking powder','¼ tsp salt','¾ cup full-fat whole milk','1 large egg','1 tbsp melted butter','½ tsp pure vanilla extract','Fresh fruit and maple syrup to serve'],
    steps:['Whisk together flour, sugar, baking powder, and salt in a large bowl.','In a separate jug, whisk milk, egg, melted butter, and vanilla.','Make a well in the dry ingredients and pour in the wet mixture.','Stir gently just until combined — small lumps are fine, do not over-mix.','Heat a non-stick pan over medium heat. Drop 2 tablespoons of batter per pancake.','Cook until bubbles form on the surface (about 2 min), flip, cook 1 more minute. Serve with fruit and syrup.'] },
  { id:25, name:'Veggie Pasta Stars', img:'https://images.unsplash.com/photo-1473093226942-47c4e6e0f8e1?w=600&q=80', diet:'children', time:'25 min', servings:4, difficulty:'Easy', calories:240, protein:9, carbs:42, fat:5, likeCount:68,
    ingredients:['250g star or small shaped pasta','1 cup butternut squash purée (steamed & blended)','½ cup frozen peas','½ cup finely diced carrots (steamed until very soft)','½ cup mild cheddar (grated)','2 tbsp cream cheese','1 tbsp butter','Pinch mild herbs (parsley)','Minimal salt — suitable for small children'],
    steps:['Cook pasta in lightly salted boiling water according to package directions.','Steam or microwave carrots until completely soft (important for small children).','In a separate pot, warm butternut squash purée with butter and cream cheese until smooth.','Drain pasta, return to pot, pour in squash sauce.','Stir in grated cheddar until fully melted.','Fold in soft carrots and peas. Sprinkle with parsley. Check temperature carefully before serving children.'] },
  { id:26, name:'Banana Oat Cookies', img:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', diet:'children', time:'25 min', servings:12, difficulty:'Easy', calories:85, protein:2, carbs:15, fat:2, likeCount:109,
    ingredients:['2 very ripe bananas (mashed smooth)','1.5 cups rolled oats','¼ cup raisins or mini chocolate chips','1 tsp ground cinnamon','½ tsp pure vanilla extract','Optional: 1 tbsp smooth natural peanut butter','Optional: 1 tbsp desiccated coconut'],
    steps:['Preheat oven to 350°F (175°C). Line a baking tray with parchment paper.','Peel and mash bananas in a large bowl until completely smooth with no lumps.','Stir in rolled oats, cinnamon, and vanilla extract.','Fold in raisins or chocolate chips and any optional extras.','Scoop heaped tablespoons onto the tray and flatten gently with the back of a spoon.','Bake 12–15 minutes until lightly golden on the edges. Cool completely before giving to children.'] },
];

/* ════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════ */
let currentUser  = JSON.parse(localStorage.getItem('nd_currentUser')) || null;
let users        = JSON.parse(localStorage.getItem('nd_users')    || '[]');
let recipes      = JSON.parse(localStorage.getItem('nd_recipes')  || 'null') || deepClone(BASE_RECIPES);
let plannerData  = JSON.parse(localStorage.getItem('nd_planner')  || '{}');
let currentDiet  = null;
let plannerSlot  = null; // { day, meal }

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
function save() {
  localStorage.setItem('nd_users',   JSON.stringify(users));
  localStorage.setItem('nd_recipes', JSON.stringify(recipes));
  localStorage.setItem('nd_planner', JSON.stringify(plannerData));
}

/* ════════════════════════════════════════════════
   PAGE ROUTING
════════════════════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  if (pg) pg.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'home')    renderHome();
  if (id === 'diets')   renderDietsPage();
  if (id === 'planner') renderPlanner();
  if (id === 'profile') renderProfile();
  if (id === 'post')    renderPostPage();
  if (id === 'admin')   renderAdminPage();
}

function requireAuth(page) {
  if (!currentUser) { openModal('loginModal'); return; }
  showPage(page);
}

function setNavActive(btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ════════════════════════════════════════════════
   HOME
════════════════════════════════════════════════ */
function renderHome() {
  document.getElementById('homeDietGrid').innerHTML = DIETS.map(dietCardHTML).join('');
  const featured = recipes.slice(0, 6);
  document.getElementById('featuredGrid').innerHTML = featured.map(recipeCardHTML).join('');
}

/* ════════════════════════════════════════════════
   DIET CARD HTML
════════════════════════════════════════════════ */
function dietCardHTML(d) {
  return `
  <div class="diet-card" onclick="openDiet('${d.id}')">
    <div class="diet-card-img-wrap">
      <img class="diet-card-img" src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'" />
    </div>
    <div class="diet-card-body">
      <div class="diet-card-name">${d.name}</div>
      <div class="diet-card-desc">${d.desc}</div>
      <span class="diet-tag" style="background:${d.tagBg};color:${d.tagColor}">${d.tag}</span>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════
   RECIPE CARD HTML
════════════════════════════════════════════════ */
function recipeCardHTML(r) {
  const diet = DIETS.find(d => d.id === r.diet) || {};
  const likes = (r.likes || []).length || r.likeCount || 0;
  const isLiked = !!(currentUser && r.likes && r.likes.includes(currentUser.id));
  const isSaved = !!(currentUser && r.savedBy && r.savedBy.includes(currentUser.id));
  return `
  <div class="recipe-card" onclick="openRecipe(${r.id})">
    <div class="recipe-card-img-wrap">
      <img class="recipe-card-img" src="${r.img}" alt="${r.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80'" />
      <span class="rc-tag">${diet.name || ''}</span>
      <span class="rc-time">⏱ ${r.time}</span>
    </div>
    <div class="recipe-card-body">
      <div class="recipe-card-title">${r.name}</div>
      <div class="recipe-card-meta">
        <span>🍽️ ${r.servings} serving${r.servings > 1 ? 's' : ''}</span>
        <span>🔥 ${r.calories} kcal</span>
        <span>📊 ${r.difficulty}</span>
      </div>
      <div class="recipe-card-footer">
        <span class="rc-author">By ${r.author || 'NutriDish'}</span>
        <div class="rc-actions">
          <button class="icon-btn ${isLiked ? 'is-liked' : ''}" onclick="event.stopPropagation();toggleLike(${r.id})">
            ${isLiked ? '❤️' : '🤍'} ${likes}
          </button>
          <button class="icon-btn ${isSaved ? 'is-saved' : ''}" onclick="event.stopPropagation();toggleSave(${r.id})">
            ${isSaved ? '🔖' : '🔖'} ${isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════
   DIETS PAGE
════════════════════════════════════════════════ */
function renderDietsPage() {
  document.getElementById('allDietGrid').innerHTML = DIETS.map(dietCardHTML).join('');
}

/* ════════════════════════════════════════════════
   OPEN DIET → RECIPES
════════════════════════════════════════════════ */
function openDiet(dietId) {
  currentDiet = dietId;
  const diet = DIETS.find(d => d.id === dietId);
  const list = recipes.filter(r => r.diet === dietId);

  document.getElementById('rcBreadcrumb').textContent = diet.name;

  document.getElementById('dietBanner').innerHTML = `
    <img class="diet-banner-img" src="${diet.img}" alt="${diet.name}" />
    <div class="diet-banner-info">
      <h2>${diet.name}</h2>
      <p>${diet.desc} &nbsp;·&nbsp; ${list.length} recipes found</p>
    </div>`;

  document.getElementById('filterBar').innerHTML =
    ['All','Easy','Medium','Hard'].map((f,i) =>
      `<button class="filter-chip${i===0?' active':''}" onclick="filterRecipes('${dietId}','${f}',this)">${f}</button>`
    ).join('');

  document.getElementById('recipesGrid').innerHTML = list.length
    ? list.map(recipeCardHTML).join('')
    : emptyState('🍽️','No recipes yet','Be the first to post one!');

  showPage('recipes');
}

function filterRecipes(dietId, diff, el) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  let list = recipes.filter(r => r.diet === dietId);
  if (diff !== 'All') list = list.filter(r => r.difficulty === diff);
  document.getElementById('recipesGrid').innerHTML = list.length
    ? list.map(recipeCardHTML).join('')
    : emptyState('🔍','No results','Try a different filter');
}

/* ════════════════════════════════════════════════
   RECIPE DETAIL
════════════════════════════════════════════════ */
function openRecipe(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  const diet = DIETS.find(d => d.id === r.diet) || {};
  const isLiked = !!(currentUser && r.likes && r.likes.includes(currentUser.id));
  const isSaved = !!(currentUser && r.savedBy && r.savedBy.includes(currentUser.id));
  const likes = (r.likes || []).length || r.likeCount || 0;

  document.getElementById('detailHero').innerHTML = `
    <img class="detail-hero-img" src="${r.img}" alt="${r.name}" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1400&q=80'" />
    <div class="detail-hero-overlay"></div>
    <div class="detail-hero-content">
      <button class="detail-back-btn" onclick="history.back()">← Back</button>
      <div class="detail-hero-title">${r.name}</div>
      <div class="detail-hero-meta">
        <span>🥗 ${diet.name || ''}</span>
        <span>⏱ ${r.time}</span>
        <span>🍽️ ${r.servings} servings</span>
        <span>📊 ${r.difficulty}</span>
        <span>🔥 ${r.calories} kcal</span>
        <span>✍️ ${r.author || 'NutriDish'}</span>
      </div>
    </div>`;

  const comments = r.comments || [];

  document.getElementById('detailBody').innerHTML = `
    <div class="detail-action-row">
      <button class="det-btn ${isLiked?'liked':''}" id="detLikeBtn" onclick="toggleLike(${r.id},true)">
        ${isLiked?'❤️':'🤍'} <span id="detLikeCount">${likes}</span> Likes
      </button>
      <button class="det-btn ${isSaved?'saved':''}" id="detSaveBtn" onclick="toggleSave(${r.id},true)">
        🔖 ${isSaved?'Saved':'Save Recipe'}
      </button>
      <button class="det-btn" onclick="openPlannerModalFromRecipe(${r.id})">📅 Add to Planner</button>
    </div>

    <div class="nutrition-strip">
      <div class="nutr-card"><div class="nutr-val">${r.calories}</div><div class="nutr-lbl">Calories</div></div>
      <div class="nutr-card"><div class="nutr-val">${r.protein}g</div><div class="nutr-lbl">Protein</div></div>
      <div class="nutr-card"><div class="nutr-val">${r.carbs}g</div><div class="nutr-lbl">Carbs</div></div>
      <div class="nutr-card"><div class="nutr-val">${r.fat}g</div><div class="nutr-lbl">Fat</div></div>
    </div>

    <div class="detail-card">
      <div class="detail-card-title">🛒 Ingredients</div>
      <div class="ingr-grid">
        ${r.ingredients.map(i => `<div class="ingr-item"><div class="ingr-dot"></div>${i}</div>`).join('')}
      </div>
    </div>

    <div class="detail-card">
      <div class="detail-card-title">👨‍🍳 Cooking Steps</div>
      ${r.steps.map((s,i) => `
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div class="step-text">${s}</div>
        </div>`).join('')}
    </div>

    <div class="detail-card">
      <div class="detail-card-title">💬 Comments (${comments.length})</div>
      <div class="comment-form">
        ${currentUser
          ? `<textarea class="comment-input" id="commentBox" placeholder="Share your experience or tips with this recipe…"></textarea>
             <button class="comment-post-btn" onclick="postComment(${r.id})">Post Comment</button>`
          : `<p style="color:var(--mid);font-size:.9rem"><a onclick="openModal('loginModal')" style="color:var(--sage);font-weight:700;cursor:pointer">Login</a> to leave a comment.</p>`}
      </div>
      <div id="commentList">
        ${comments.length
          ? comments.map(c => `
              <div class="comment-item">
                <div class="comment-avatar">${c.name[0].toUpperCase()}</div>
                <div>
                  <div class="comment-name">${c.name}</div>
                  <div class="comment-text">${c.text}</div>
                  <div class="comment-time">${c.time}</div>
                </div>
              </div>`).join('')
          : '<p style="color:var(--muted);font-size:.88rem">No comments yet — be the first!</p>'}
      </div>
    </div>`;

  showPage('detail');
}

function postComment(recipeId) {
  if (!currentUser) { openModal('loginModal'); return; }
  const box = document.getElementById('commentBox');
  const text = box.value.trim();
  if (!text) return showToast('Please write something first');
  const r = recipes.find(x => x.id === recipeId);
  if (!r.comments) r.comments = [];
  r.comments.unshift({ name: currentUser.name, text, time: new Date().toLocaleString() });
  save();
  openRecipe(recipeId);
  showToast('Comment posted! 💬');
}

/* ════════════════════════════════════════════════
   LIKE / SAVE
════════════════════════════════════════════════ */
function toggleLike(id, isDetail) {
  if (!currentUser) { openModal('loginModal'); return; }
  const r = recipes.find(x => x.id === id);
  if (!r.likes) r.likes = [];
  const idx = r.likes.indexOf(currentUser.id);
  if (idx === -1) { r.likes.push(currentUser.id); showToast('Liked! ❤️'); }
  else            { r.likes.splice(idx, 1);         showToast('Removed like'); }
  save();
  if (isDetail) {
    const liked = r.likes.includes(currentUser.id);
    const btn = document.getElementById('detLikeBtn');
    btn.className = `det-btn ${liked ? 'liked' : ''}`;
    btn.innerHTML = `${liked ? '❤️' : '🤍'} <span id="detLikeCount">${r.likes.length}</span> Likes`;
  } else { refreshCurrentView(); }
}

function toggleSave(id, isDetail) {
  if (!currentUser) { openModal('loginModal'); return; }
  const r = recipes.find(x => x.id === id);
  if (!r.savedBy) r.savedBy = [];
  const idx = r.savedBy.indexOf(currentUser.id);
  if (idx === -1) { r.savedBy.push(currentUser.id); showToast('Saved! 🔖'); }
  else            { r.savedBy.splice(idx, 1);         showToast('Removed from saved'); }
  save();
  if (isDetail) {
    const saved = r.savedBy.includes(currentUser.id);
    const btn = document.getElementById('detSaveBtn');
    btn.className = `det-btn ${saved ? 'saved' : ''}`;
    btn.innerHTML = `🔖 ${saved ? 'Saved' : 'Save Recipe'}`;
  } else { refreshCurrentView(); }
}

function refreshCurrentView() {
  const active = document.querySelector('.page.active');
  if (!active) return;
  const id = active.id.replace('page-','');
  if (id === 'home')    renderHome();
  if (id === 'recipes' && currentDiet) openDiet(currentDiet);
  if (id === 'profile') renderProfile();
}

/* ════════════════════════════════════════════════
   SEARCH
════════════════════════════════════════════════ */
function doSearch() {
  const q = document.getElementById('heroSearch').value.trim().toLowerCase();
  if (!q) return;
  const results = recipes.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.ingredients.some(i => i.toLowerCase().includes(q)) ||
    (DIETS.find(d => d.id === r.diet)?.name.toLowerCase().includes(q))
  );
  document.getElementById('searchInfo').textContent = `Found ${results.length} recipe${results.length !== 1 ? 's' : ''} for "${q}"`;
  document.getElementById('searchGrid').innerHTML = results.length
    ? results.map(recipeCardHTML).join('')
    : emptyState('🔍','No recipes found','Try different keywords');
  showPage('search');
}

/* ════════════════════════════════════════════════
   POST RECIPE
════════════════════════════════════════════════ */
function renderPostPage() {
  const sel = document.getElementById('postDiet');
  sel.innerHTML = '<option value="">Select a diet category…</option>' +
    DIETS.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
}

function previewPostImg(url) {
  const wrap = document.getElementById('postImgPreview');
  if (url && url.startsWith('http')) {
    wrap.innerHTML = `<img src="${url}" alt="Preview" onerror="this.parentElement.innerHTML=''" />`;
  } else { wrap.innerHTML = ''; }
}

let uploadedImageURL = '';

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      uploadedImageURL = evt.target.result;
      previewPostImg(uploadedImageURL);
    };
    reader.readAsDataURL(file);
  } else {
    uploadedImageURL = '';
    previewPostImg('');
  }
}

function submitRecipe() {
  if (!currentUser) { openModal('loginModal'); return; }
  const name = document.getElementById('postName').value.trim();
  const img  = uploadedImageURL || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80';
  const diet = document.getElementById('postDiet').value;
  const time = document.getElementById('postTime').value.trim() || '30 min';
  const diff = document.getElementById('postDiff').value;
  const ing  = document.getElementById('postIngredients').value.trim();
  const steps= document.getElementById('postSteps').value.trim();
  const cals = parseInt(document.getElementById('postCals').value) || 300;
  const prot = parseInt(document.getElementById('postProtein').value) || 15;
  const carb = parseInt(document.getElementById('postCarbs').value) || 30;
  const fat  = parseInt(document.getElementById('postFat').value) || 10;

  if (!name) return showToast('Please enter a recipe name');
  if (!diet) return showToast('Please select a diet category');
  if (!ing)  return showToast('Please list the ingredients');
  if (!steps)return showToast('Please add the cooking steps');

  const newR = {
    id: Date.now(),
    name, img, diet, time, servings: 2, difficulty: diff,
    calories: cals, protein: prot, carbs: carb, fat,
    author: currentUser.name,
    authorId: currentUser.id,
    ingredients: ing.split('\n').map(s => s.trim()).filter(Boolean),
    steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
    likeCount: 0, likes: [], savedBy: [], comments: []
  };

  recipes.unshift(newR);
  save();
  showToast('🎉 Recipe published! Amazing work!');
  ['postName','postImgFile','postTime','postIngredients','postSteps','postCals','postProtein','postCarbs','postFat'].forEach(id => { document.getElementById(id).value = ''; });
  uploadedImageURL = '';
  document.getElementById('postDiet').value = '';
  document.getElementById('postImgPreview').innerHTML = '';
  showPage('home'); renderHome();
}

/* ════════════════════════════════════════════════
   PLANNER
════════════════════════════════════════════════ */
const DAYS  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const MEALS = ['Breakfast','Lunch','Dinner','Snack'];

function renderPlanner() {
  const today = new Date();
  // Find Monday of this week
  const dayOfWeek = today.getDay(); // 0=Sun
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  document.getElementById('weekGrid').innerHTML = DAYS.map((day, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toLocaleDateString('en-GB', { month:'short', day:'numeric' });
    const isToday = d.toDateString() === today.toDateString();
    return `
      <div class="day-col">
        <div class="day-head" style="${isToday ? 'background:var(--amber)' : ''}">
          <div class="day-name">${day.slice(0,3)}${isToday?' 📍':''}</div>
          <div class="day-date">${dateStr}</div>
        </div>
        <div class="day-meals">
          ${MEALS.map(meal => {
            const key = `${day}-${meal}`;
            const rId = plannerData[key];
            const r   = rId ? recipes.find(x => x.id === rId) : null;
            return `
              <div class="meal-slot">
                <div class="meal-label">${meal}</div>
                <div class="meal-item ${r ? 'has-meal' : ''}" onclick="openPlannerModal('${day}','${meal}')">
                  ${r
                    ? `<img class="meal-img" src="${r.img}" alt="${r.name}" onerror="this.style.display='none'" />
                       <div class="meal-name">${r.name}</div>
                       <button class="meal-remove" onclick="event.stopPropagation();removeMeal('${key}')">✕</button>`
                    : '<div class="meal-plus">+ Add</div>'}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
}

function openPlannerModal(day, meal) {
  if (!currentUser) { openModal('loginModal'); return; }
  plannerSlot = { day, meal };
  document.getElementById('plannerSubText').textContent = `${day} — ${meal}`;
  renderPlannerList('');
  openModal('plannerModal');
}

function openPlannerModalFromRecipe(rId) {
  if (!currentUser) { openModal('loginModal'); return; }
  const r = recipes.find(x => x.id === rId);
  // Show day/slot selector
  const list = document.getElementById('plannerList');
  document.getElementById('plannerSubText').textContent = `Add "${r.name}" to which slot?`;
  list.innerHTML = DAYS.map(d => MEALS.map(m => {
    return `
      <div class="planner-option" onclick="assignToSlot('${d}','${m}',${rId})">
        <span style="font-size:1.4rem">📅</span>
        <div>
          <div class="planner-opt-name">${d}</div>
          <div class="planner-opt-meta">${m}</div>
        </div>
      </div>`;
  }).join('')).join('');
  openModal('plannerModal');
}

function renderPlannerList(query) {
  const q = query.toLowerCase();
  const list = recipes.filter(r => r.name.toLowerCase().includes(q) || DIETS.find(d=>d.id===r.diet)?.name.toLowerCase().includes(q)).slice(0,30);
  document.getElementById('plannerList').innerHTML = list.map(r => {
    const diet = DIETS.find(d => d.id === r.diet) || {};
    return `
      <div class="planner-option" onclick="assignToSlot('${plannerSlot?.day}','${plannerSlot?.meal}',${r.id})">
        <img class="planner-opt-img" src="${r.img}" alt="${r.name}" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=100&q=60'" />
        <div>
          <div class="planner-opt-name">${r.name}</div>
          <div class="planner-opt-meta">${diet.name || ''} · ${r.calories} kcal · ${r.time}</div>
        </div>
      </div>`;
  }).join('');
}

function filterPlannerList(val) {
  renderPlannerList(val);
}

function assignToSlot(day, meal, rId) {
  plannerData[`${day}-${meal}`] = rId;
  save();
  closeModal('plannerModal');
  renderPlanner();
  showToast(`Added to ${day} ${meal}! 📅`);
}

function removeMeal(key) {
  delete plannerData[key];
  save();
  renderPlanner();
}

function clearPlanner() {
  if (!confirm('Clear the entire week plan?')) return;
  plannerData = {};
  save();
  renderPlanner();
  showToast('Planner cleared');
}

function printPlanner() {
  showToast('Opening print dialog…');
  setTimeout(() => window.print(), 400);
}

/* ════════════════════════════════════════════════
   ADMIN DASHBOARD
════════════════════════════════════════════════ */
function renderAdminPage() {
  if (!currentUser || currentUser.email !== 'tapansahoo4496@gmail.com') {
    document.getElementById('adminTableBody').innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;color:red;font-weight:bold">Access Denied. Owner only.</td></tr>';
    return;
  }
  
  fetch(`${API_BASE}/users`)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      const html = data.map(u => `
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:15px">${u.id}</td>
          <td style="padding:15px;font-weight:600">${u.name}</td>
          <td style="padding:15px">${u.email}</td>
          <td style="padding:15px;color:red;font-family:monospace">${u.pass}</td>
          <td style="padding:15px">${u.joined}</td>
        </tr>
      `).join('');
      document.getElementById('adminTableBody').innerHTML = html || '<tr><td colspan="5" style="padding:20px;text-align:center">No users found</td></tr>';
    })
    .catch(e => {
       document.getElementById('adminTableBody').innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;color:red">Failed to load user data from backend</td></tr>';
    });
}

/* ════════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════════ */
function renderProfile() {
  if (!currentUser) return;
  const myRecs    = recipes.filter(r => r.authorId === currentUser.id);
  const savedRecs = recipes.filter(r => r.savedBy && r.savedBy.includes(currentUser.id));
  const likedRecs = recipes.filter(r => r.likes   && r.likes.includes(currentUser.id));

  document.getElementById('profileHero').innerHTML = `
    <div class="profile-avatar">${currentUser.name[0].toUpperCase()}</div>
    <div>
      <div class="profile-name">${currentUser.name}</div>
      <div class="profile-email">${currentUser.email}</div>
      <div class="profile-stats">
        <div><div class="pstat-n">${myRecs.length}</div><div class="pstat-l">Recipes</div></div>
        <div><div class="pstat-n">${savedRecs.length}</div><div class="pstat-l">Saved</div></div>
        <div><div class="pstat-n">${likedRecs.length}</div><div class="pstat-l">Liked</div></div>
        <div><div class="pstat-n">${currentUser.joined || 'Today'}</div><div class="pstat-l">Joined</div></div>
      </div>
    </div>`;

  document.getElementById('myRecGrid').innerHTML = myRecs.length
    ? myRecs.map(recipeCardHTML).join('')
    : emptyState('📝','No recipes posted yet','Share your first recipe!');

  document.getElementById('savedGrid').innerHTML = savedRecs.length
    ? savedRecs.map(recipeCardHTML).join('')
    : emptyState('🔖','Nothing saved yet','Save recipes you love!');

  document.getElementById('likedGrid').innerHTML = likedRecs.length
    ? likedRecs.map(recipeCardHTML).join('')
    : emptyState('❤️','No liked recipes','Like recipes to see them here!');
}

function switchTab(id, btn) {
  document.querySelectorAll('.ptab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.getElementById('ptab-' + id).classList.remove('hidden');
  btn.classList.add('active');
}

/* ════════════════════════════════════════════════
   AUTH & API CONFIG
════════════════════════════════════════════════ */
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') 
  ? 'http://localhost:8080/api' 
  : '/api'; // Routes seamlessly through Vercel's internal backend proxy

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const email= document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  if (!name)         return showToast('Please enter your name');
  if (!email.includes('@')) return showToast('Please enter a valid email');
  if (pass.length < 6)    return showToast('Password must be at least 6 characters');
  
  fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, pass })
  })
  .then(res => res.json().then(data => ({ status: res.status, ok: res.ok, body: data })))
  .then(res => {
      if (!res.ok) return showToast(res.body.error || 'Registration failed');
      currentUser = res.body;
      localStorage.setItem('nd_currentUser', JSON.stringify(currentUser));
      closeModal('registerModal');
      updateNavAuth();
      showToast(`Welcome to NutriDish, ${res.body.name}! 🎉`);
  })
  .catch(e => showToast('Error connecting to Java backend.'));
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  
  if (!email || !pass) return showToast('Please enter email and password');

  fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass })
  })
  .then(res => res.json().then(data => ({ status: res.status, ok: res.ok, body: data })))
  .then(res => {
      if (!res.ok) return showToast(res.body.error || 'Login failed');
      currentUser = res.body;
      localStorage.setItem('nd_currentUser', JSON.stringify(currentUser));
      closeModal('loginModal');
      updateNavAuth();
      showToast(`Welcome back, ${res.body.name.split(' ')[0]}! 👋`);
  })
  .catch(e => showToast('Error connecting to Java backend.'));
}

function doLogout() {
  currentUser = null;
  localStorage.removeItem('nd_currentUser');
  updateNavAuth();
  showPage('home');
  showToast('Logged out successfully');
}

function updateNavAuth() {
  const el = document.getElementById('navAuth');
  const adminBtn = document.getElementById('navAdminBtn');
  if (currentUser) {
    if (adminBtn) adminBtn.style.display = (currentUser.email === 'tapansahoo4496@gmail.com') ? 'inline-block' : 'none';
    el.innerHTML = `
      <span style="font-size:.84rem;font-weight:600;color:var(--forest)">👤 ${currentUser.name.split(' ')[0]}</span>
      <button class="btn-outline" onclick="doLogout()">Logout</button>`;
  } else {
    if (adminBtn) adminBtn.style.display = 'none';
    el.innerHTML = `
      <button class="btn-outline" onclick="openModal('loginModal')">Login</button>
      <button class="btn-fill"    onclick="openModal('registerModal')">Sign Up</button>`;
  }
}

/* ════════════════════════════════════════════════
   MODALS
════════════════════════════════════════════════ */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function switchModal(from, to) {
  closeModal(from); openModal(to);
}
function overlayClose(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

/* ════════════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════════════ */
function toggleMobileMenu() {
  document.getElementById('navbar').classList.toggle('mobile-menu-open');
}

/* ════════════════════════════════════════════════
   TOAST
════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════ */
function emptyState(icon, title, sub) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><h3>${title}</h3><p>${sub}</p></div>`;
}

/* ════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  updateNavAuth();
});
