import Mock from 'mockjs';

// 模拟获取用户列表数据
Mock.mock('/api/user/list', {
  'code': 200,
  'message': 'success',
  'data|10': [
    {
      'id|+1': 1,
      'name': '@cname',
      'age|18-60': 18,
      'email': '@email'
    }
  ]
});