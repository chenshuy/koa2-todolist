<template>
  <div class="todo-wrap">
    <div class="todo-add">
      <el-input @keyup.enter.native="addList" v-model="inputText" placeholder="添加todo" size="medium"></el-input>
      <el-button @click="addList" type="primary" size="medium">添加</el-button>
    </div>
    <h2>正在进行
      <span>{{listActive.length}}</span>
    </h2>
    <ul class="todo-list">
      <li v-for="(item, index) in listActive" :key="item.key">
        <em @click="updateList(1, item, index)" class="checkbox">
          <i class="el-icon-check"></i>
        </em>
        <span class="text">{{item.content}}</span>
        <i @click="delList(listActive, index)" title="删除" class="el-icon-close"></i>
      </li>
    </ul>
    <h2>已经完成
      <span>{{listComplate.length}}</span>
    </h2>
    <ul class="todo-list complate">
      <li v-for="(item, index) in listComplate" :key="item.key">
        <em @click="updateList(0, item, index)" class="checkbox">
          <i class="el-icon-check"></i>
        </em>
        <span class="text">{{item.content}}</span>
        <i @click="delList(listComplate, index)" title="删除" class="el-icon-close"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      inputText: '',
      listActive: [],
      listComplate: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取list数据
    getList() {
      api.getList()
        .then(({ data }) => {
          if (data.s) {
            const listC = [];
            const listA = [];
            data.d.forEach((item) => {
              if (item.status) {
                listC.push(item);
              } else {
                listA.push(item);
              }
            });
            this.listComplate = listC;
            this.listActive = listA;
          } else {
            this.$message.error(data.m);
          }
        });
    },
    // 添加list
    addList() {
      if (!this.inputText) {
        this.$message.error('不能为空');
        return;
      }
      const fromData = {
        content: this.inputText,
        status: 0
      };
      api.createList(fromData)
        .then(({ data }) => {
          if (data.s) {
            this.getList();
            this.inputText = '';
          } else {
            this.$message.error(data.m);
          }
        });
    },
    // 更新
    updateList(status, item, index) {
      const fromData = {
        status,
        content: item.content,
        id: item.id
      };
      if (status === 1) {
        this.listActive.splice(index, 1);
        this.listComplate.push(fromData);
      } else {
        this.listActive.push(fromData);
        this.listComplate.splice(index, 1);
      }
      api.updateList(fromData)
        .then(({ data }) => {
          if (!data.s) {
            this.$message.error(data.m);
          }
        });
    },
    // 删除
    delList(List, index) {
      api.delList({
        id: List[index].id
      }).then(({ data }) => {
        if (data.s) {
          List.splice(index, 1);
        } else {
          this.$message.error(data.m);
        }
      });
    }
  }
};
</script>

<style lang="scss">
$cl: #409EFF;
.todo-wrap {
  max-width: 600px;
  margin: 50px auto;
  h2 {
    margin: 20px 0 10px;
    line-height: 20px;
    span {
      float: right;
      background: $cl;
      color: #fff;
      border-radius: 50%;
      width: 20px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
    }
  }
}
.todo-add {
  .el-input {
    width: 500px;
  }
  .el-button {
    float: right;
  }
}

.todo-list {
  li {
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    border-left: 5px solid $cl;
    background: #fff;
    .checkbox {
      float: left;
      width: 16px;
      height: 16px;
      line-height: 16px;
      margin-top: 5px;
      border: 1px solid #bbb;
      color: #fff;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      i {
        font-size: 12px;
      }
    }
    .text {
      width: 400px;
      margin-left: 10px;
      font-size: 14px;
      line-height: 28px;
    }
    .el-icon-close {
      float: right;
      line-height: 28px;
      font-size: 24px;
      color: #666;
      cursor: pointer;
    }
  }
  &.complate {
    li {
      border-left-color: #bbb;
      .checkbox {
        background: #bbb;
      }
    }
  }
}
</style>
