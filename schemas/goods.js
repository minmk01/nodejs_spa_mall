const mongoose = require("mongoose");

const goodsSchema = mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnailUrl: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
});

module.exports = mongoose.model("Goods", goodsSchema); //모델 이름은 Goods, 스키마 이름은 goodsSchema
// 내보내서 계속 재사용할 수 있게 하기 위해 module.exports에 이꼴(=) 오른쪽의 값이 들어가도록 코드를 써줌. 