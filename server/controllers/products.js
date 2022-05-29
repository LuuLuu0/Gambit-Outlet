const axios = require('axios');
const { API_URL } = require('../../config');

// get one product
exports.getOneProduct = async (req, res) => {
  console.log('get1product server works??')
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization } })
  try {
    const overview = await axios.get(`${API_URL}products/${req.params.productId}`, { headers: { Authorization: req.headers.Authorization }});
    const styles = await axios.get(`${API_URL}products/${req.params.productId}/styles`, { headers: { Authorization: req.headers.Authorization }});
    const combined = [];
    await combined.push(overview.data, styles.data);
    res.status(200).send(combined);
  } catch (err) {
    res.status(400).send(err);
  }
};

// add to cart NEED TO FIX!!
exports.addToCart = async (req, res) => {
  console.log('addToCart server works??')
  axios.post(async (req, res) => {
    try {
      const response = await axios.post(`${API_URL}cart`, req.body, apiHeaders);
      res.status(201).send(response.data);
    } catch (err) {
      res.send(err);
    }
  });
};
