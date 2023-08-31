const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./handler/auth');
const community = require('./handler/community')
const dotenv = require('dotenv');
const admin = require('./handler/admin')
const appl = require("./handler/app")
const user = require("./handler/user")
const species = require("./handler/species")
const productRating = require("./handler/productRating")
const productCategory = require("./handler/productCategory")
const product = require("./handler/product")
const organization = require("./handler/organization")
const order = require("./handler/order")
const interest = require("./handler/interests")
const fishCatch = require("./handler/fishCatch")
const document = require("./handler/document")
const deal = require("./handler/deal")
const dashboard = require("./handler/dashboard")
const communityTopicCategory = require("./handler/communityTopicCategory")
const communityTopic = require("./handler/communityTopic")
const comment = require("./handler/comment")
const cart = require("./handler/cart")
const boat = require("./handler/boat")
const address = require("./handler/address")
const tournament = require("./handler/tournament")
const license = require("./handler/license")
const regulation = require("./handler/regulation")
const faq = require("./handler/faq")

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const authMiddleware = async (req, res, next) => {
    const response = await auth.init(req, res);
    //console.log("auth route",response.body);
    res.json(JSON.parse(response.body));
    next(response);
};

const communityMiddleware = async (req, res, next) => {
  const response = await community.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const adminMiddleware = async (req, res, next) => {
  const response = await admin.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const appMiddleware = async (req, res, next) => {
  const response = await appl.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const userMiddleware = async (req, res, next) => {
  const response = await user.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const speciesMiddleware = async (req, res, next) => {
  const response = await species.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const addressMiddleware = async (req, res, next) => {
  const response = await address.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const productRatingMiddleware = async (req, res, next) => {
  const response = await productRating.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const productCategoryMiddleware = async (req, res, next) => {
  const response = await productCategory.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const productMiddleware = async (req, res, next) => {
  const response = await product.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const organizationMiddleware = async (req, res, next) => {
  const response = await organization.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const orderMiddleware = async (req, res, next) => {
  const response = await order.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const interestMiddleware = async (req, res, next) => {
  const response = await interest.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const fishCatchMiddleware = async (req, res, next) => {
  const response = await fishCatch.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const documentMiddleware = async (req, res, next) => {
  const response = await document.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const dealMiddleware = async (req, res, next) => {
  const response = await deal.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const dashboardMiddleware = async (req, res, next) => {
  const response = await dashboard.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const communityTopicCategoryMiddleware = async (req, res, next) => {
  const response = await communityTopicCategory.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const communityTopicMiddleware = async (req, res, next) => {
  const response = await communityTopic.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const commentMiddleware = async (req, res, next) => {
  const response = await comment.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const cartMiddleware = async (req, res, next) => {
  const response = await cart.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const boatMiddleware = async (req, res, next) => {
  const response = await boat.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const tournamentMiddleware = async (req, res, next) => {
  const response = await tournament.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const licenseMiddleware = async (req, res, next) => {
  const response = await license.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const regulationMiddleware = async (req, res, next) => {
  const response = await regulation.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

const faqMiddleware = async (req, res, next) => {
  const response = await faq.init(req, res);
  res.json(JSON.parse(response.body));
  next(response);
};

app.use('/dev/auth', authMiddleware);
app.use('/dev/community', communityMiddleware);
app.use('/dev/admin', adminMiddleware);
app.use('/dev/app', appMiddleware);
app.use('/dev/user', userMiddleware);
app.use('/dev/species', speciesMiddleware);
app.use('/dev/address', addressMiddleware);
app.use('/dev/productRating', productRatingMiddleware);
app.use('/dev/productCategory', productCategoryMiddleware);
app.use('/dev/product', productMiddleware);
app.use('/dev/organization', organizationMiddleware);
app.use('/dev/order', orderMiddleware);
app.use('/dev/interests', interestMiddleware);
app.use('/dev/fishCatch', fishCatchMiddleware);
app.use('/dev/document', documentMiddleware);
app.use('/dev/deal', dealMiddleware);
app.use('/dev/dashboard', dashboardMiddleware);
app.use('/dev/communityTopicCategory', communityTopicCategoryMiddleware);
app.use('/dev/communityTopic', communityTopicMiddleware);
app.use('/dev/comment', commentMiddleware);
app.use('/dev/cart', cartMiddleware);
app.use('/dev/boat', boatMiddleware);
app.use('/dev/tournament',tournamentMiddleware);
app.use('/dev/license',licenseMiddleware);
app.use('/dev/regulation',regulationMiddleware);
app.use('/dev/faq',faqMiddleware);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});