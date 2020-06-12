//把获得到的token存到localStorage里
export const setStorage = (key, value) => {
  if (typeof value == "object") {
    //如果传过来的是对象，则转换成字符串
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value); //存到localStorage里
};

//获取localStorage里的token
export const getStorage = (key) => {
  let _storage = String(localStorage.getItem(key));
  // todo 优化判断方式
  if (
    _storage[0] === '[' || _storage[0] === '{' &&
    _storage[_storage.length] === ']' || _storage[_storage.length] === '}'
  ) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
};

export const getEnum = (key) => {
  let
    _enum = getStorage('enum'),
    _idx = _enum.findIndex(i => {
      return i.name === key
    });
  return _enum[_idx].items
};
