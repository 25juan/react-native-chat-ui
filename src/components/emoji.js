var emoji = require('node-emoji')
var emojis = [
    "grinning","grin","joy","smiley","smile","sweat_smile","laughing","innocent","smiling_imp","wink","blush","yum","relieved","heart_eyes","sunglasses","smirk","neutral_face","expressionless","unamused","sweat","pensive","confused","confounded","kissing","kissing_heart","kissing_smiling_eyes","kissing_closed_eyes","stuck_out_tongue","stuck_out_tongue_winking_eye","stuck_out_tongue_closed_eyes","disappointed","worried","angry","rage","cry","persevere","triumph","disappointed_relieved","frowning","anguished","fearful","weary","sleepy","tired_face","grimacing","sob","open_mouth","hushed","cold_sweat","scream","astonished","flushed","sleeping","dizzy_face","no_mouth","mask","smile_cat","joy_cat","smiley_cat","heart_eyes_cat","smirk_cat","kissing_cat","pouting_cat","crying_cat_face","scream_cat","slightly_frowning_face","slightly_smiling_face","upside_down_face","face_with_rolling_eyes",
    "heart",
    "heartbeat",
    "broken_heart",
    "imp",
    "rose",
    "rose","hibiscus","sunflower","blossom","corn","ear_of_rice","herb","four_leaf_clover","maple_leaf","fallen_leaf","leaves","mushroom","tomato","eggplant","grapes","melon","watermelon","tangerine","lemon","banana","pineapple","apple","green_apple","pear","peach","cherries","strawberry","hamburger","pizza","meat_on_bone","poultry_leg","rice_cracker","rice_ball","rice","curry","ramen","spaghetti","bread","fries","sweet_potato","dango","oden","sushi","fried_shrimp","fish_cake","icecream","shaved_ice","ice_cream","doughnut","cookie","chocolate_bar","candy","lollipop","custard","honey_pot","cake","bento","stew","fork_and_knife","tea","sake","wine_glass","cocktail","tropical_drink","beer","beers","baby_bottle","knife_fork_plate","champagne","popcorn","ribbon","gift","birthday","jack_o_lantern","christmas_tree","santa","fireworks","sparkler","balloon","tada","confetti_ball","tanabata_tree","crossed_flags","bamboo","dolls","flags","wind_chime","rice_scene","school_satchel","mortar_board",
    "mouse2","ox","water_buffalo","cow2","tiger2","leopard","rabbit2","cat2","dragon","crocodile","whale2","snail","snake","racehorse","ram","goat","sheep","monkey","rooster","chicken","dog2","pig2","boar","elephant","octopus","shell","bug","ant","bee","beetle","fish","tropical_fish","blowfish","turtle","hatching_chick","baby_chick","hatched_chick","bird","penguin","koala","poodle","dromedary_camel","camel","dolphin","mouse","cow","tiger","rabbit","cat","dragon_face","whale","horse","monkey_face","dog","pig","frog","hamster","wolf","bear","panda_face","pig_nose","feet","chipmunk","eyes","eye","ear","nose","lips","tongue","point_up_2","point_down","point_left","point_right","facepunch","wave","ok_hand","clap","open_hands","crown","womans_hat",
];

var map = {};
for (var i in emojis) {
    var name = emojis[i];
    var code = emoji.get(name);
    map[code] = name;
    //console.log("code:", code);
    //console.log("name:", name);
}

module.exports = {
  map: map,
    emojis:emojis
};
