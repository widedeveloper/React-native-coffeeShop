import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import ShopActions from '../Redux/ShopRedux'
import { ACTION_GOTO_DETAIL, ACTION_GOTO_EDIT } from '../Redux/NavigationRedux';
import { ERROR_SAVE, EMPTY_NAME, EMPTY_STREET, EMPTY_ZIPCODE, EMPTY_CITY, EMPTY_STATE, EMPTY_COUNTRY, EMPTY_PHONENUMBER, EMPTY_INSTAGRAM, EMPTY_OPEN, EMPTY_CLOSE, EMPTY_URL } from '../Constants/constants.js'

export function * getShopList (api, action) {  
  // make the call to the api
  const response = yield call(api.getShopList)
  if (response.status) {
    const {shops} = response;
    // do data conversion here if needed
    let listItems = [];
    for(let key in shops){
        let item = shops[key].data;
        item['id'] = key;
        listItems.push(item);
    }
    const locationinfo = yield call(api.getCurrentLocation);
    if(locationinfo.status){
      let results = [];
      for(let key in listItems){
          let item = listItems[key];
          let address = item.address;
          address = address.street+", "+address.city+", "+address.state+", "+address.country;
          const distanceinfo = yield call(api.getDistance,[locationinfo,address]);
          if(distanceinfo.status)
            item.distance = distanceinfo.distance;
          results.push(item);
      }
      yield put(ShopActions.refreshSuccess(results))
    }
    else
      yield put(ShopActions.refreshSuccess(listItems))
  } else {
    const shops = [];
    yield put(ShopActions.refreshSuccess(shops))
  }
}

export function * saveShop (api, data) {
  const shopId = data.shopId;
  data = data.data;
  if (data.country === '') {
    yield put(ShopActions.failure(EMPTY_COUNTRY))
  }
  else if (data.name === '') {
    yield put(ShopActions.failure(EMPTY_NAME))
  } else if (data.address.street === '') {
    yield put(ShopActions.failure(EMPTY_STREET))
  } else if (data.address.zipcode === '') {
    yield put(ShopActions.failure(EMPTY_ZIPCODE))
  } else if (data.address.city === '') {
    yield put(ShopActions.failure(EMPTY_CITY))
  } else if (data.address.state === '') {
    yield put(ShopActions.failure(EMPTY_STATE))
  } else {
    let response={};
    if(shopId==0) {
      // make the call to the api
      if(data.shopImage === '')
        response = yield call(api.saveShop, data)
      else{
        let uri = data.shopImage.uri;
        response = yield call(api.saveImage, uri)
        if(response.status){
          data.shopImage = response.image;
          response = yield call(api.saveShop, data);
        }
      }
    } else {
      if(data.shopImage === '')
        response = yield call(api.updateShop, data, shopId)
      else {
        let str = data.shopImage;
        if(typeof str === 'object'){
          console.log(str)
          let uri = str.uri;
          if(uri==''){
            data.shopImage = '';
            response = yield call(api.updateShop, data, shopId);
          }
          else if(uri.startsWith('http')){
            data.shopImage = uri;
            response = yield call(api.updateShop, data, shopId);
          }
          else{
            response = yield call(api.saveImage, uri)
            if(response.status){
              data.shopImage = response.image;
              response = yield call(api.updateShop, data, shopId);
            }
          }
        }
        else{
          response = yield call(api.updateShop, data, shopId);
        }
      }
    }
    if (response.status) {
      // do data conversion here if needed
      yield put(ShopActions.saveShopSuccess(response.id))
      yield put({type:ACTION_GOTO_DETAIL})
    } else {
      yield put(ShopActions.failure(ERROR_SAVE, response.message))
    }
  }
}

export function * saveImage (api, data) {
  data = data.image;
  let response = yield call(api.saveImage, data.uri)
  if (response.status) {
    // do data conversion here if needed
    yield put(ShopActions.saveImageSuccess(response.image))
  } else {
    yield put(ShopActions.failure(ERROR_SAVE, response.message))
  }
}

export function * getShopinfo (api, data) {
  let shopId = data.id;
  const response = yield call(api.getShopinfo, shopId)
  if (response.status) {
    const {shopinfo} = response;
    // do data conversion here if needed
    yield put(ShopActions.successShopinfo(shopinfo))
  } else {
    yield put(ShopActions.failure(ERROR_SAVE, ''))
  }
}

export function * gotoDetailShop () {
  yield put({type:ACTION_GOTO_DETAIL});
}

export function * gotoEditShop () {
  yield put({type:ACTION_GOTO_EDIT});
}