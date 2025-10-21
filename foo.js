// Object에 접근하기 

const response = {
    body: {
      items: [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'baz'},
      ]
    }
  }
  
  console.log(response.body.items[0].name) // foo
  console.log(response.body.items[1].id) // 2