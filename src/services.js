import axios from "axios";

export const getList = function(page, ord, category) {
  return axios.get(
    `http://comento.cafe24.com/request.php?page=${page}&ord=${ord}&category=${category}`
  );
};

export const getCategories = function() {
  return axios.get("http://comento.cafe24.com/category.php");
};

export const getAdsList = function(page, limit) {
  return axios.get(
    `http://comento.cafe24.com/ads.php?page=${page}&limit=${limit}`
  );
};

export const getDetailContents = function(req_no) {
  return axios.get(`http://comento.cafe24.com/detail.php?req_no=${req_no}`);
};
