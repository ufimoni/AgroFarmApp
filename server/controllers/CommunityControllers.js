const Community = require('./../models/communityModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler')

exports.addArticle = async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.user.id;

  try {
    let community = await Community.findOne();
    if (!community) {
      community = new Community({ name: 'AgroFarm Community' });
    }

    community.articles.push({ title, content, tags, createdBy: userId });
    await community.save();

    res.status(201).json({ message: 'Article added', community });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add article', error: err.message });
  }
};

exports.searchArticles = async (req, res) => {
  const { query } = req.query;

  try {
    const community = await Community.findOne().populate('articles.createdBy', 'name');
    const filtered = community.articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};
