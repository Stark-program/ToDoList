if (successfulLogIn === true) {
  return initialToDoList
    .filter((x) => x.to_Do_Completed === false)
    .map((d) => (
      <div key={d._id.toString()} className="row">
        <List
          itemLayout="horizontal"
          dataSource={initialToDoList}
          renderItem={(item) => {
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>;
          }}
        />
        {d.to_Do_Item}
        {/* <div className="col-sm-10">
            <li className="uniqueItem">{d.to_Do_Item}</li>
          </div> */}
        <div className="col-sm-2">
          <span>
            <button
              className="btnComplete"
              onClick={() => {
                let token = localStorage.getItem("Authorization");
                let config = {
                  headers: {
                    authorization: token,
                  },
                };
                let newArr = [...initialToDoList];
                let newNew = newArr.findIndex((item) => item._id === d._id);
                let newData = newArr.filter((x) => {
                  if (x.to_Do_Item === d.to_Do_Item) {
                    return x.to_Do_Item;
                  }
                });

                axios
                  .post("http://localhost:3001/completed", newData, config)
                  .then((res) => {
                    if (res.status === 200) {
                      newArr[newNew].to_Do_Completed = true;
                      setInitialToDoList(newArr);
                    }
                  });
              }}
            >
              <CheckCircleOutlined />
            </button>
            <button
              className="btnRemove"
              onClick={() => {
                let token = localStorage.getItem("Authorization");
                let config = {
                  headers: {
                    authorization: token,
                  },
                };
                let newArr = [...initialToDoList];
                let newNew = newArr.findIndex((item) => item._id === d._id);
                let deletedArr = newArr.filter((x) => {
                  return x._id === d._id;
                });

                axios
                  .post("http://localhost:3001/deleted", deletedArr, config)
                  .then((res) => {
                    if (res.status === 200) {
                      newArr.splice(newNew, 1);
                      setInitialToDoList(newArr);
                    }
                  });
              }}
            >
              <CloseCircleOutlined />
            </button>
          </span>
        </div>
      </div>
    ));
}
