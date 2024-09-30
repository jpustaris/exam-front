<template>
  <div id="orderDetails" class="q-pt-0 q-pl-sm order-details">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-9 col-md-8 col-sm-12 q-gutter-y-md">
        <q-card class="card-header q-pa-sm">
          <q-card-section class="text-no-wrap">
            <span class="text-weight-bolder text-accent">Order Details</span>
          </q-card-section>
          <q-card-section class="q-py-none">
            <q-separator/>
          </q-card-section>
          <q-card-section class="q-col-gutter-y-xs">
            <div class="row text-caption q-col-gutter-x-md order-details-info">
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Order No:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.order_pin}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Current Status:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.status_text}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row text-caption q-col-gutter-x-md order-details-info">
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Customer Name:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.customer.first_name}} {{order.customer.last_name}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Est. Delivery Time:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.estimated_delivery_time.estimated_delivery_time}} mins</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row text-caption q-col-gutter-x-md order-details-info">
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Order Date:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.order_date}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Created Date:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.created_datetime}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row text-caption q-col-gutter-x-md order-details-info">
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Created By:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.user_name}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Modified By:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.updated_by}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row text-caption q-col-gutter-x-md order-details-info">
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Contact No:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.delivery_address.contact_number}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col-lg-4 col-md-6">
                    <span class="text-accent">Address:</span>
                  </div>
                  <div class="col-lg-8 col-md-6">
                    <span class="text-weight-bold">{{order.delivery_address.address}}</span>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="card-header q-pa-sm">
          <q-card-section class="text-no-wrap">
            <span class="text-weight-bolder nowrap text-accent">Order Items</span>
          </q-card-section>
          <q-card-section class="q-py-none">
            <q-separator/>
          </q-card-section>
          <q-list>
            <div v-for="(orderItem, index) in order.order_items" :key="index">
              <q-item dense>
                <q-item-section>
                  <q-item-label class="text-h6 text-weight-medium">{{ orderItem.quantity }} X {{orderItem.product.name}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense>
                <q-item-section side>
                  <q-item-label class="text-subtitle2 text-weight-bold text-white bg-dark q-pa-sm" v-if="order.is_scd == true && orderItem.product.discountable == 1 && orderItem.scd_count > 0 && orderItem.product.menu_id > 0">SCD: {{ orderItem.scd_count }}</q-item-label>
                  <q-item-label class="text-subtitle2 text-weight-bold text-white bg-dark q-pa-xs" v-if="order.is_pwd == true && orderItem.product.discountable == 1 && orderItem.pwd_count > 0 && orderItem.product.menu_id > 0">PWD: {{ orderItem.pwd_count }}</q-item-label>
                </q-item-section>
                <q-item-section left>
                  <q-item-label class="text-subtitle2 text-weight-medium text-accent">POSCODE: {{ orderItem.pos_code }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="text-body2 q-px-sm text-weight-medium">₱ {{orderItem.gross_price}} X {{ orderItem.quantity }}</div>
                </q-item-section>

                <q-item-section side>
                  <div class="text-bold text-black text-weight-bold">₱ {{ totalItem(orderItem.gross_price, orderItem.quantity) }}</div>
                </q-item-section>
              </q-item>
            </div>
            <q-separator class="bg-shadow" spaced inset />
            <q-item dense class="q-pb-md">
              <q-item-section></q-item-section>
              <q-item-section side>
                <div class="q-px-sm text-body1">Subtotal</div >
              </q-item-section>
              <q-item-section side>
                <div
                  v-if="order.coupon_data && (order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_percentage_off)"
                  class="text-bold text-black text-weight-bolder">
                    ₱ {{ Number( Number(order.total_w_vat) + Number(percentageDiscount(order.order_items, order.coupon_data.percent_discount)) ).toFixed(2) }}
                </div>
                <div
                  v-else-if="order.coupon_data && (order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_fixed_discount)"
                  class="text-bold text-black text-weight-bolder">
                    ₱ {{ Number( Number(order.total_w_vat) + Number(fixedDiscount(order.coupon_data.fixed_discount_amount)) ).toFixed(2) }}
                </div>
                <div v-else class="text-bold text-black text-weight-bolder">₱ {{order.total_w_vat}}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <q-card class="card-header q-px-sm q-py-md q-mb-md">
          <q-card-section class="text-no-wrap">
            <span class="text-weight-bolder nowrap text-accent">Order Remarks:</span>
          </q-card-section>
          <q-card-section class="q-py-none">
            <q-separator/>
          </q-card-section>
          <q-card-section class="q-gutter-y-sm text-caption">
            <span class="text-h6 text-weight-medium q-mt-sm text-dark">{{order.order_remarks}}</span>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-3 col-md-4 col-sm-12 q-gutter-y-md q-pb-md">
        <q-card class="shadow-0 q-pa-sm card-header">
          <q-card-section class="text-no-wrap">
            <span class="text-weight-bolder nowrap text-accent">Price Breakdown</span>
          </q-card-section>
          <q-card-section class="q-py-none">
            <q-separator/>
          </q-card-section>
          <q-card-section class="q-gutter-y-sm text-caption">

            <!-- Order Price Details -->
            <div class="flex justify-between">
              <div class="text-accent">Total with VAT</div>
              <div
                v-if="order.coupon_data && (order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_percentage_off)"
                class="text-dark">
                  {{ Number( Number(order.total_w_vat) + Number(percentageDiscount(order.order_items, order.coupon_data.percent_discount)) ).toFixed(2) }}
              </div>
              <div
                v-else-if="order.coupon_data && (order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_fixed_discount)"
                class="text-dark">
                  {{ Number( Number(order.total_w_vat) + Number(fixedDiscount(order.coupon_data.fixed_discount_amount)) ).toFixed(2) }}
              </div>
              <div v-else class="text-dark">{{ order.total_w_vat }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-accent">Net Total</div>
              <div class="text-dark">{{ order.total_net }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-accent">Service Method</div>
              <div class="text-dark" v-if="!order.is_stm == true">{{(order.service_method_id == 2 ? 'Pickup' : 'Delivery')}}</div>
              <div class="text-dark" v-if="order.is_stm == true">Send to Many</div>
            </div>
            <div class="flex justify-between">
              <div class="text-accent">Delivery Charge</div>
              <div class="text-dark">{{ order.delivery_charge }}</div>
            </div>
            <div class="flex justify-between q-pb-md">
              <div class="text-accent">Gross Total</div>
              <div class="text-dark">{{ order.total_gross }}</div>
            </div>

            <!-- Discounts -->
            <div v-if="order.is_stm == true" class="flex justify-between">
              <div class="text-accent">STM</div>
              <div class="text-dark">Yes</div>
            </div>
            <div v-if="order.is_scd == 1" class="flex justify-between">
              <div class="text-accent">S.C. Discount:</div>
              <div class="text-primary">- {{ order.total_discounts }}</div>
            </div>
            <div v-if="order.is_scd == 1" class="flex justify-between">
              <div class="text-accent">S.C. VAT:</div>
              <div class="text-primary">- {{ order.excess_vat }}</div>
            </div>
            <div v-if="order.is_scd == 1" class="flex justify-between">
              <div class="text-accent">S.C. ID:</div>
              <div class="text-dark">{{ order.scd_id }}</div>
            </div>
            <div v-if="order.is_scd == 1" class="flex justify-between q-pb-md">
              <div class="text-accent">S.C. Name:</div>
              <div class="text-dark">{{ order.scd_name }}</div>
            </div>
            <div v-if="order.is_pwd == 1" class="flex justify-between">
              <div class="text-accent">PWD Discount:</div>
              <div class="text-primary">- {{ order.total_discounts }}</div>
            </div>
            <div v-if="order.is_pwd == 1" class="flex justify-between">
              <div class="text-accent">PWD VAT:</div>
              <div class="text-primary">- {{ order.excess_vat }}</div>
            </div>
            <div v-if="order.is_pwd == 1" class="flex justify-between">
              <div class="text-accent">PWD ID:</div>
              <div class="text-dark">{{ order.pwd_id }}</div>
            </div>
            <div v-if="order.is_pwd == 1" class="flex justify-between q-pb-md">
              <div class="text-accent">PWD Name:</div>
              <div class="text-dark">{{ order.pwd_name }}</div>
            </div>

            <!-- DGC and Coupon Details -->
            <div class="flex justify-between" v-if="order.dgc_data">
              <div class="text-accent">GC Amount</div>
              <div class="text-primary">- {{ order.dgc_data.amount }}</div>
            </div>
            <div class="flex justify-between" v-if="order.dgc_data">
              <div class="text-accent">DGC Code</div>
              <div>{{ order.dgc_data.item_code }}</div>
            </div>
            <div v-if="order.coupon_data">
                <div class="flex justify-between q-mb-sm" v-if="order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_fixed_discount">
                  <div class="text-accent">Fixed Coupon Discount</div>
                  <div class="text-primary">- {{ fixedDiscount(order.coupon_data.fixed_discount_amount) }}</div>
                </div>
                <div class="flex justify-between" v-if="order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_percentage_off">
                  <div class="text-accent">Percentage Off Discount</div>
                  <div class="text-primary">- {{ percentageDiscount(order.order_items, order.coupon_data.percent_discount) }}</div>
                </div>
            </div>
            <div class="flex justify-between" v-if="order.coupon_data">
              <div class="text-accent">Coupon Code</div>
              <div class="text-dark">{{ order.coupon_data.coupon_code }}</div>
            </div>

            <!-- Payment Details -->
            <div class="flex justify-between q-pt-md">
              <div class="text-accent">Payment Type</div>
              <div class="text-dark">{{ order.payment_text }}</div>
            </div>
            <!-- Adding this for future dev items -->
            <!-- <div class="flex justify-between">
              <div class="text-weight-bolder">RRN</div>
              <div class="text-weight-bold"></div>
            </div> -->
            <div class="flex justify-between q-pb-md">
              <div class="text-accent">Order Type</div>
              <div class="text-dark">{{ order.source_text }}</div>
            </div>

            <!-- Total Details -->
            <div class="flex justify-between">
              <div class="text-accent">Tendered Amount</div>
              <div class="text-weight-bolder">{{ order.tendered_amount }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-accent">Change Amount</div>
              <div>{{ order.change_amount }}</div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="card-header q-my-md">
          <q-card-section>
            <div class="q-pa-sm q-gutter-sm">
              <q-btn class="button-new text-weight-bolder text-capitalize q-py-md" round text-color="dark" @click.capture="invoice = true" flat dense label="Invoice" />
              <q-btn class="button-new text-weight-bolder text-capitalize q-py-md" round text-color="dark" @click.capture="processTime = true" flat dense label="Process Time" />
            </div>
          </q-card-section>
        </q-card>
        <q-card id="order-notes" class="card-header q-px-sm q-py-md q-mb-md">
          <q-card-section>
            <span class="text-weight-bolder text-accent">Order Notes </span>
          </q-card-section>
          <q-card-section class="q-py-none">
            <q-separator/>
          </q-card-section>
          <q-card-section>
            <div v-for="(notes, index) in order.order_notes" :key="index" class="q-my-sm">
              <div v-if="notes.is_view == 0" class="bg-yellow-3 q-pa-sm">
                <i class="text-caption text-primary">*New Note*</i><br><br>
                <span class="text-wrap text-weight-bold">{{ notes.message }}</span><br>
                <span class="text-caption">
                  {{ notes.user_username }}<br>
                  {{ format_date(new Date(notes.created_at)).format("MM-DD-YY hh:mm:ss a") }}
                </span>
              </div>

              <div v-if="notes.is_view == 1" class="q-pa-sm">
                <span class="text-wrap">{{ notes.message }}</span><br>
                <span class="text-caption text-grey">
                  {{ notes.user_username }}<br>
                  {{ format_date(new Date(notes.created_at)).format("MM-DD-YY hh:mm:ss a") }}
                </span>
              </div>
            </div>
            <span class="text-weight-bold" v-if="!order.order_notes.length" disabled>No order notes found.</span>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- DIALOGS -->

    <!-- Invoice -->
    <q-dialog v-model="invoice">
      <q-card class="q-py-sm q-px-md invoice-modal">
        <q-card-section>
          <span class="text-weight-bolder text-dark text-h6">Invoice</span>
        </q-card-section>

        <q-card-section class="q-py-none">
          <q-separator/>
        </q-card-section>

        <q-card-section>
          <!-- Order Details -->
          <div class="row wrap">
            <div class="col-4 text-accent">Order No.:</div><div class="col-8 text-weight-bolder">{{order.order_pin}}</div>
            <div class="col-4 text-accent">Order Type:</div><div class="col-8">{{order.source_text}}</div>
            <div class="col-4 text-accent">Payment Type:</div><div class="col-8">{{order.payment_text}}</div>
            <div class="col-4 text-accent">Order Date:</div><div class="col-8">{{order.order_date}}</div>
            <div class="col-4 text-accent">Delivery Date:</div><div class="col-8">{{order.delivery_date}}</div>
            <div class="col-4 text-accent">Print Count:</div><div class="col-8">{{order.print_counter}}</div>
            <div class="col-4 text-accent">Service Method:</div>
              <div v-if="!order.is_stm == true" class="col-6">{{(order.service_method_id == 2 ? 'Pickup' : 'Delivery')}}</div>
              <div v-if="order.is_stm == true" class="col-6">Send to Many</div>
            <div class="col-4 text-accent">Customer Name:</div><div class="col-8">{{order.customer.first_name + ' ' + order.customer.last_name}}</div>
          </div>

          <div v-if="order.is_stm == true" class="row">
            <div class="col-4 text-accent">STM Host:</div><div class="col-8">{{order.stm_host_name}}</div>
            <div class="col-4 text-accent">STM Host No.:</div><div class="col-8">{{order.stm_host_number}}</div>
          </div>

          <!-- Customer Address -->
          <div class="row">
            <div class="col-12 text-h6 q-mt-sm"><b >Address</b></div>
            <div class="col-4 text-accent">Delivery Address:</div><div class="col-8">{{order.delivery_address.address}}</div>
            <!-- <div class="col-6">City:</div><div class="col-6">{{order.city_name}}</div> -->
            <div class="col-4 text-accent">Landmarks:</div><div class="col-8">{{order.delivery_address.landmark_1}}</div>
            <div class="col-4 text-accent">Address Remarks:</div><div class="col-8">{{order.delivery_address.remarks}}</div>
            <div class="col-4 text-accent">Proximity Distance:</div><div class="col-8">{{order.additional.distance_km + ' km (' + order.additional.travel_time_mins + ' mins approx. )'}}</div>
          </div>
          <!-- Item Details -->
          <div class="row">
            <div class="col-12 text-h6 q-mt-sm"><b>Item Details</b></div>
            <div class="col-12 row">
              <div class="col-1" v-if="order.is_scd == true">SCD</div>
              <div class="col-1" v-if="order.is_pwd == true">PWD</div>
              <div class="col">Item</div>
              <div class="col">Description</div>
              <div class="col">Quantity</div>
              <div class="col">Total</div>
            </div>
            <div v-for="(orderItem, index) in order.order_items" :key="index" class="col-12 row">
              <div class="col-1" v-if="order.is_scd == true && orderItem.product.discountable == 1">{{ orderItem.product.menu_id > 0 ? orderItem.scd_count : '0' }}</div>
              <div class="col-1" v-if="order.is_pwd == true && orderItem.product.discountable == 1">{{ orderItem.product.menu_id > 0 ? orderItem.pwd_count : '0' }}</div>
              <div class="col text-weight-bold">{{orderItem.product.name}}</div>
              <div class="col text-weight-bold">{{orderItem.product.description}}</div>
              <div class="col text-weight-bold">{{orderItem.quantity}}</div>
              <div class="col">{{ totalItem(orderItem.gross_price, orderItem.quantity) }}</div>
            </div>
          </div>
          <!-- Order Remarks -->
          <div class="row q-mt-md">
            <div class="col-6 text-accent">Order Remarks:</div>
            <div class="col-6">{{order.order_remarks}}</div>
            <!-- Utensils -->
            <div class="col-12 q-my-md" v-if="order.utensils.no_utensils">NO UTENSILS</div>
          </div>

          <div class="row" style="margin-top: 10px"></div>
          <div v-if="order.is_scd == 1" class="row">
            <div class="col-6 text-accent">S.C. ID:</div>
            <div class="col-6">{{ order.scd_id }}</div>
            <div class="col-6 text-accent">S.C. Name:</div>
            <div class="col-6 text-accent">{{ order.scd_name }}</div>
          </div>
          <div v-if="order.is_pwd == 1" class="row">
            <div class="col-6 text-accent">PWD ID:</div>
            <div class="col-6">{{ order.pwd_id }}</div>
            <div class="col-6 text-accent">PWD Name:</div>
            <div class="col-6">{{ order.pwd_name }}</div>
          </div>

          <div v-if="order.dgc_data">
            <div class="row" >
              <div class="col-6 text-accent">GC Amount:</div>
              <div class="col-6 text-primary">- {{ order.dgc_data.amount }}</div>
            </div>
          </div>

          <div v-if="order.coupon_data">
            <div class="row" v-if="order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_fixed_discount">
              <div class="col-6 text-accent">Coupon Fixed Discount:</div>
              <div class="col-6 text-primary">- {{ fixedDiscount(order.coupon_data.fixed_discount_amount) }}</div>
            </div>
            <div class="row" v-if="order.coupon_data.coupon_type === 'discount' && order.coupon_data.is_percentage_off">
              <div class="col-6 text-accent">Percentage Off Discount:</div>
              <div class="col-6 text-primary">- {{ percentageDiscount(order.order_items, order.coupon_data.percent_discount) }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 text-accent">Delivery Charge:</div>
            <div class="col-6">{{ order.delivery_charge }}</div>
            <div v-if="order.total_discounts != 0" class="col-6 text-accent">Discount:</div>
            <div v-if="order.total_discounts != 0" class="col-6" :style="{color: order.total_discounts != 0 ? '#DB0007' : '#1E1E1E'}"><span v-if="order.total_discounts != 0">- </span>{{ order.total_discounts }}</div>
            <div v-if="order.is_scd == 1" class="col-6 text-accent">SCD Vat:</div>
            <div v-if="order.is_scd == 1" class="col-6 text-primary">- {{ order.excess_vat }}</div>
            <div v-if="order.is_pwd == 1" class="col-6 text-accent">PWD Vat:</div>
            <div v-if="order.is_pwd == 1" class="col-6 text-primary">- {{ order.excess_vat }}</div>
            <div class="col-6 text-accent">Total:</div>
            <div class="col-6">{{ order.total_gross }}</div>
            <div class="col-6 text-accent">Tendered Amount:</div>
            <div class="col-6 text-weight-bolder">{{ order.tendered_amount }}</div>
            <div v-if="order.voucher_amount != 0 && [2,6,7].includes(order.payment_id)" class="col-6 text-accent">Vouchers Amount:</div>
            <div v-if="order.voucher_amount != 0 && [2,6,7].includes(order.payment_id)" class="col-6" :style="{color: order.voucher_amount != 0 ? '#DB0007' : '#1E1E1E'}"><span v-if="order.voucher_amount != 0">- </span>{{ order.voucher_amount }}</div>
            <div class="col-6 text-accent">Change Amount:</div>
            <div class="col-6">{{ order.change_amount }}</div>
          </div>
          <div class="row" style="margin-top: 10px"></div>
          <div class="row">
            <div class="col-6 text-accent">{{ order.service_method_id == 1 ? 'Rider:' : 'Staff:' }}</div>
            <div class="col-6">{{ order.status > 2 ? order.rider_name : '' }}</div>
            <div v-if="order.service_method_id == 1" class="col-6 text-accent">Booking ID:</div>
            <div v-if="order.service_method_id == 1" class="col-6">{{ order.status > 2 && order.delivery_booking ? order.delivery_booking.delivery_id : '' }}</div>
            <div class="col-6 text-accent">Dispatcher:</div>
            <div class="col-6">{{ order.dispatcher }}</div>
            <div class="col-6 text-accent">Agent:</div>
            <div class="col-6">{{ order.agent_name }}</div>
            <div class="col-12" style="margin-top: 10px"></div>
            <div class="col-12">Thank You!</div>
          </div>
        </q-card-section>

        <!-- Added by Ero - print invoice button -->
        <q-card-actions align="right">
          <q-btn flat label="Print Invoice" class="bg-primary text-white" @click.capture="print_invoice()" />
          <q-btn flat class="bg-secondary text-dark" label="Close"  v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Process Time -->
    <q-dialog v-model="processTime">
      <q-card style="width: 400px">
        <q-card-section class="card-header">
          <div class="text-h6">Process Time</div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-6 text-accent">Received</div>
            <div class="col-6 font-weight-bolder">{{ order.received_datetime }}</div>
            <div class="col-6 text-accent">Acknowledged</div>
            <div class="col-6 font-weight-bolder">{{ order.acknowledged_datetime }}</div>
            <div class="col-6 text-accent">Rider Assigned</div>
            <div class="col-6 font-weight-bolder">{{ order.rider_assigned_datetime }}</div>
            <div class="col-6 text-accent">Rider Out</div>
            <div class="col-6 font-weight-bolder">{{ order.rider_out_datetime }}</div>
            <div class="col-6 text-accent">Rider Back</div>
            <div class="col-6 font-weight-bolder">{{ order.rider_back_datetime }}</div>
            <div class="col-6 text-accent">Customer Receive Time</div>
            <div class="col-6 font-weight-bolder">{{ order.customer_receive_datetime }}</div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat class="bg-secondary text-dark" label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  data(){
    return {
      invoice: false,
      processTime: false
    }
  },
  computed: {
    ...mapGetters('Auth', {
      user: 'GET_PROFILE',
    })
  },
  methods: {
    handleScroll () {
      var order_notes_area = document.getElementById('order-notes')
      order_notes_area.scrollIntoView({behavior: 'smooth'})
    },
    totalItem(item, qty){
      return Number(item * qty).toFixed(2)
    },
    format_date(raw_date) {
      return moment(new Date(raw_date))
    },
    print_invoice() {
      invoicePrinter.print_invoice(this.order)
    },
    fixedDiscount(fixed_discount_amount) {
      return Number(fixed_discount_amount).toFixed(2)
    },
    percentageDiscount(orderItem, percent_discount) {
      var total_gross = 0
      var order_price = 0
      var quantity    = 0

      orderItem.forEach(index => {
        order_price = index.gross_price
        quantity    = index.quantity
        total_gross += parseFloat(order_price * quantity)
      });

      return Number((total_gross / 100) * percent_discount).toFixed(2)
    },
  },
  mounted() {
    if (this.order.new_order_notes_counter > 0) {
      this.handleScroll()
    }
  },
  beforeUpdate() {
    if (this.order.new_order_notes_counter > 0) {
      this.handleScroll()
    }
  },
  update() {
    if (this.order.new_order_notes_counter > 0) {
      this.handleScroll()
    }
  }
}
</script>

<style>

</style>
