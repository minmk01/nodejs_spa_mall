const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");
const router = express.Router();

router.get("/goods/cart", async (req, res) => {
  const carts = await Cart.find();
  const goodsIds = carts.map((cart) => cart.goodsId); //cart.goodsId는 return cart.goodsId와 같은 의미의 코드.
  
  const goods = await Goods.find({ goodsId: goodsIds });
  
  res.json({
      cart: carts.map((cart) => ({ //4-7강. 프론트엔드 측 두번째 요구사항에 의해 맨 앞에 있던 carts를 cart로 바꿈. 
              quantity: cart.quantity,
              goods: goods.find((item) => item.goodsId === cart.goodsId),
      })),
  });
});

router.get("/", (req, res) => {
  res.send("this is root page");
});

router.get("/goods", async (req, res) => {
  const { category } = req.query;

  const goods = await Goods.find({ category });

  res.json({
    goods
  });
});

router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;

  const [goods] = await Goods.find({ goodsId: Number(goodsId) });

  res.json({
    goods,
  });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 장바구니에 들어있는 상품입니다." });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity });
  res.json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId: Number(goodsId) });
  }

  res.json({ success: true});
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (!existsCarts.length) {
    await Cart.create({ goodsId: Number(goodsId), quantity });
  } else {
    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  }

  res.json({ success: true });
});
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터 입니다." });

  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

module.exports = router;