const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿を更新
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("投稿編集に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を編集できません");
    }
  } catch (error) {
    return res.status(403).json(error);
  }
});

// 投稿を削除
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("投稿削除に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を削除できません");
    }
  } catch (error) {
    return res.status(403).json(error);
  }
});

// 特定の投稿を取得
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(403).json(error);
  }
});

// 特定の投稿をいいね
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // まだ投稿にいいねを押していない場合、「いいね」可能
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("投稿にいいねを押しました！");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json("投稿からいいねを外しました");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// タイムラインの投稿を取得
router.get("/timeline/:userid", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userid);
    const userPosts = await Post.find({ userId: currentUser._id });
    // 自分がフォローしている友達の投稿内容を全て取得
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;

// プロフィール専用タイムラインの投稿を取得
router.get("/profile/:username", async (req, res) => {
  console.log(req.params.username);
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    // 自分がフォローしている友達の投稿内容を全て取得
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
