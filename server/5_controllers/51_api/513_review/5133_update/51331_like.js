// Local import
const check = require('../../../../6_utility/60_check/603_reviewLike');
const model = require('../../../../7_models');
const insert = require('../../../../9_query/93_reviews/931_post/9312_like');
const toggle = require('../../../../9_query/93_reviews/933_update/9331_like');

module.exports = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[51331_cont ] activated update like query: ${toggle.true}`);
  }

  const exist = await check(req.body.review_id, req.user_id);
  if (!exist.length) {
    await model(insert, [req.body.review_id, req.user_id]);
    res.json({ success: true, message: true });
  } else {
    switch (exist[0].toggle) {
      case 'true': {
        await model(toggle.true, [req.body.review_id, req.user_id]);
        res.json({ success: true, message: false });
        break;
      }
      case 'false': {
        await model(toggle.false, [req.body.review_id, req.user_id]);
        res.json({ success: true, message: true });
        break;
      }
      default: {
        res.json({ success: false, message: 'unexpected error' });
      }
    }
  }
};
