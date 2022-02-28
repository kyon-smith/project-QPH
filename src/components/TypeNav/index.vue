<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="changeIndex(-1);showTypeNav=$route.meta.showTypeNav" @mouseenter="showTypeNav=true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="showTypeNav">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" :class="{cur:index===currentIndex}" v-for="(c1,index) in categoryList"
                   :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!--二级分类-->
                <div class="item-list clearfix" v-show="index===currentIndex">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                            c2.categoryName
                          }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                              c3.categoryName
                            }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">屈品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {throttle} from 'lodash'

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      showTypeNav: false,
    }
  },
  methods: {
    // hover样式
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 80),
    // 路由跳转
    goSearch(e) {
      //注意dataset小写
      let {categoryname, category1id, category2id, category3id} = e.target.dataset
      if (!categoryname) return
      let query = {categoryName: categoryname}
      if (category1id) {
        query.category1Id = category1id
      } else if (category2id) {
        query.category2Id = category2id
      } else {
        query.category3Id = category3id
      }
      let location = {
        name: 'searchName',
        query
      }
      if (this.$route.params) {
        location.params = this.$route.params
      }
      this.$router.push(location)
    }
  },
  computed: {
    ...mapState('home', ['categoryList'])
    // ...mapState({categoryList: state => state.home.categoryList})
  },
  mounted() {
    this.showTypeNav = this.$route.meta.showTypeNav
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: auto;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        height: 479px;
        overflow: hidden;

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            box-sizing: border-box;
            position: absolute;
            width: 734px;
            min-height: 479px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.cur {
            background-color: skyblue;
          }
        }
      }
    }

    //过渡动画
    .sort-enter, .sort-leave-to {
      opacity: 0;
    }

    .sort-enter-to, .sort-leave {
      opacity: 1;
    }

    .sort-enter-active, .sort-leave-active {
      transition: all 0.3s linear;
    }

  }
}
</style>