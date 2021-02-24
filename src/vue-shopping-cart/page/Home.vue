<template>
  <div class="home">
          <Navbar />

          <el-button @click='signOut'>Sign Out</el-button>

          <div class="products" v-if="products.length>0">
              <div class="products-tool">
                  <el-select name="size" :value="size" @change="change" placeholder='Sizes' size='mini' >
                      <el-option v-for='size in sizes' :key='size' :value='size' :label='size'></el-option>
                  </el-select>
                  <el-select name="select" :value="select" @change='change' placeholder="Select" size='mini'>
                      <el-option label='Lowest to highest' value='lowest'></el-option>
                      <el-option label='Highest to lowest' value='highest'></el-option>
                      <el-option label='Random' value='random'></el-option>
                  </el-select>
              </div>
              <p>{{selectProducts.length}} product(s) found</p>
              <el-row :gutter='20'>
                  <el-col :span='6' v-for='product in filterProducts' :key='product.id'>
                      <el-card :body-style="{ padding: '0px' }" class='card'>
                          <img :src="'static/products/'+product.sku+'_1.jpg'" :alt="product.title" />
                          <div class="card-content">
                              <p>$<span :style='{fontWeight: 600}'>{{ product.price }}</span></p>
                              <p>or {{ product.installments}} x {{product.currencyFormat}}{{ (product.price/product.installments).toFixed(2) }}</p>
                              <el-button plain class='card-btn' @click="add(product.id)">Add to cart</el-button>
                          </div>
                      </el-card>
                  </el-col>
              </el-row>
          </div>
          
          <el-badge :value='quantity' class="badge" type="primary">
              <i class="el-icon-shopping-cart-2 drawer-cart" @click="drawer=true"/>
          </el-badge>
          <el-drawer :with-header='false' :visible.sync='drawer' size="35%" >
              <div class="drawer-header">
                  <el-badge :value='quantity' type="primary">
                      <i class="el-icon-shopping-cart-2 drawer-cart" />
                      
                  </el-badge>
                  <h4>Cart</h4>
              </div>
              <div class="drawer-content" v-if="cartProducts.length>0">
                  <div class="drawer-product" v-for="product in cartProducts" :key="product.id">
                          <img :src="'static/products/'+product.sku+'_2.jpg'" :alt="product.title" />
                          <div class="info">
                              <p>{{product.title}}</p>
                              <p>{{product.availableSizes[0]}} | {{ product.style }}</p>
                              <p>Quantity: {{product.quantity}}</p>
                          </div>
                          <div class="tool">
                              <el-button type='text' @click='remove(product.id)'>x</el-button>
                              <p>${{ product.price }}</p>
                              <button @click="decrease(product.id)" :disabled='product.quantity===1'>-</button>
                              <button @click="increase(product.id)">+</button>
                          </div>
                  </div>                  
              </div>
              <div class="drawer-tool">
                      <el-row type="flex" justify="between" align="middle">
                          <el-col :xs='6' style="padding: 1rem">SUBTOTAL</el-col>
                          <el-col :xs='6'>
                              <p>$<span style='fontWeight: 700'>{{ total }}</span></p>
                              <p>OR UP TO 5 x ${{(total/5).toFixed(2)}}</p>
                          </el-col>
                      </el-row>
                      <el-button @click='checkout'>CHECKOUT</el-button>
                  </div>
          </el-drawer>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import Navbar from '../components/Navbar';

export default {
    name: 'Home',
    components: {
        Navbar,
    },
    data() {
        return {
            drawer: false,
            cartProducts: [],
            size: '',
            select: '',
            sizes: ['XS','S','M','ML','L','XL','XXL'],
            selectProducts: [],
        }
    },
    methods: {
        ...mapActions(['getProducts','doSignOut']),

        signOut() {
            this.$confirm('确认登出吗?','登出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                confirmButtonClass: 'confirm-btn',
                cancelButtonClass: 'confirm-btn'
            }).then(()=> {
                this.doSignOut();
            }).catch(()=> {
                return;
            })
        },

        change(select) {
            this.selectProducts = this.sortProducts(select);
        },
        add(id) {
            this.drawer = true;
            
            if(this.cartProducts.some(product => product.id===id)) {
                //检查购物车中是否存在此商品,如果存在,数量加 1
                this.cartProducts = this.cartProducts.map(product=> {
                    if(product.id===id) {
                        return {
                            ...product,
                            quantity: product.quantity + 1,
                        }
                    }
                    return product;
                })
            }else {
                //获取指定id的产品,添加数量属性,添加到购物车
                let product = this.products.filter((product)=> product.id===id);
                product = {
                    ...(product[0]),
                    quantity: 1,
                };
                this.cartProducts= this.cartProducts.concat(product);
            }         
        },
        remove(id) {
            // 删除购物车中指定 id的商品
            this.cartProducts= this.cartProducts.filter(product=> product.id!==id);
        },
        decrease(id) {
            // 增加购物车中的商品数量
            this.cartProducts = this.cartProducts.map((product)=> {
                if(product.id===id) {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    }
                }
                return product;
            })
        },
        increase(id) {
            // 减少购物车中的商品数量
            this.cartProducts = this.cartProducts.map((product)=> {
                if(product.id===id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                }
                return product;
            })
        },
        checkout() {
            if(this.cartProducts.length>0) {
                this.$notify({
                    title: 'Checkout',
                    message: 'Subtotal: $' + this.total,
                    position: 'top-left',
                    type: 'success'
                })
                
            }else {
                this.$message({
                    message: 'Add some product in the cart!',
                    type: 'warning',
                    chowClose: true,
                    center: true,
                })
            }
        }
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['sortProducts']),

        filterProducts() {
            return this.selectProducts.length>0 ? this.selectProducts : this.products;
        },
        
        quantity() {
            return this.cartProducts.reduce((a,product)=> a+product.quantity,0)
        },
        total() {
            return this.cartProducts.reduce((a,product)=> a + (product.quantity*product.price),0)
        },
        
    },
    created() {
        this.getProducts();
    },


}
</script>

<style>
.products {
    margin-top: 5rem;
    padding: 0 1rem;
}
.card {
    text-align: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0;
}
.card img {
    height: 200px;
}
.el-badge.badge {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
}
.el-drawer__body {
    display: flex;
    flex-direction: column;
}

.drawer-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
}
.drawer-header h4 {
    margin-left: 1rem;
    font-size: 1.2rem;
}
.drawer-cart {
    transform: scale(2.5);
}
.drawer-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
}
.drawer-product .info {
    font-size: 0.8rem;
}
.drawer-product img {
    height: 80px;
}
.drawer-product .tool p {
    color: #eabf00;
}
.drawer-tool {
    margin-top: auto;
    margin-bottom: 0.5rem;
}
.drawer-tool .el-col:last-of-type {
    text-align: center;
}
.drawer-tool p:last-of-type {
    font-size: 0.8rem;
}
</style>