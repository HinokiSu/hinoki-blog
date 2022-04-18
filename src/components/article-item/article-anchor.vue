<template>
  <div>
    <a-anchor v-if="tocAst">
      <!-- 第一级 -->
      <a-anchor-link v-for="c1 in tocAst.c" :key="c1" :href="`#${c1.n.trim()}`" :title="c1.n">
        <!-- 第二级 -->
        <span v-if="c1.c">
          <a-anchor-link v-for="c2 in c1.c" :key="c2" :href="`#${c2.n.trim()}`" :title="c2.n">
            <!-- 第三级 -->
            <span v-if="c2.c">
              <a-anchor-link v-for="c3 in c2.c" :key="c3" :href="`#${c3.n.trim()}`" :title="c3.n">
                <!-- 第四级 -->
                <span v-if="c3.c">
                  <a-anchor-link v-for="c4 in c3.c" :key="c4" :href="`#${c4.n.trim()}`" :title="c4.n">
                    <!-- 第五级 -->
                    <span v-if="c4.c">
                      <a-anchor-link v-for="c5 in c4.c" :key="c5" :href="`#${c5.n.trim()}`" :title="c5.n">
                        <!-- 第六级 -->
                        <span v-if="c5.c">
                          <a-anchor-link v-for="c6 in c5.c" :key="c6" :href="`#${c6.n.trim()}`" :title="c6.n">
                            <!-- 第七级 -->
                            <span v-if="c6.c">
                              <a-anchor-link v-for="c7 in c6.c" :key="c7" :href="`#${c7.n.trim()}`" :title="c7.n">
                              </a-anchor-link>
                            </span>
                          </a-anchor-link>
                        </span>
                      </a-anchor-link>
                    </span>
                  </a-anchor-link>
                </span>
              </a-anchor-link>
            </span>
          </a-anchor-link>
        </span>
      </a-anchor-link>
    </a-anchor>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, reactive } from 'vue'

export default defineComponent({
  name: 'ArticleAnchor',
  props: {
    toc: Object,
  },
  setup(props) {
    const tocAst = ref()
    const tocList = ref()
    /* 
    {
      href: '',
      title:'',
      children: []
    } */

    watch(
      () => props.toc,
      () => {
        tocAst.value = props.toc
        console.log(tocAst.value)

        // ast解构出来
        /*
        基础结构: {l: 0, n: '', c: Array}
        c: [
          {l: 0, n: '', c: Array}
          {l: 0, n: '', c: Array}
        ]
        -> {t: [], }
      */

        if (tocAst.value.c !== []) {
          // 第0层
          /*  for (let i = 0, len = tocAst.value.c.length; i < len; i++) {
            console.log(tocAst.value.c[0])
          } */
          tocList.value = tocAst.value[0]
        }
      }
    )
    return { tocAst, tocList }
  },
})
</script>

<style scoped></style>
