var MP = require ("mercadopago");
var mp = new MP (process.env.ClientID, process.env.ClientSecret);

exports.handler = function(event, context, callback) {

    var JSONRsp = '';

    var preference = {
        "items": [
              {
                  "id": "",
                  "title": "",
                  "description": "",
                  "picture_url": "",
                  "category_id": "",
                  "quantity": 1,
                  "currency_id": "ARS",
                  "unit_price": 10.5
              }
        ],
        "payer": [
            {
                "name": "",
                "surname": "",
                "email": "",
                "phone": [
                    {
                      "area_code": "",
                      "number": "",
                    }
                ],
                "identification": [
                    {
                      "type": "",
                      "number": "",
                    }
                ],
                "address": [
                    {
                      "zip_code": "",
                      "street_name": "",
                      "street_number": ""
                    }
                ],
                "date_created": ""
            }
        ],
        /*
        "payment_methods": [
            {
                "excluded_payment_methods": [
                    {
                        "id": ""
                    }
                ],
                "excluded_payment_types": [
                    {
                        "id": ""
                    }
                ],
                "default_payment_method_id": "",
                "installments": "",
                "default_installments": ""
            }
        ],
        "shipments": [
            {
                "mode": "",
                "local_pickup": "",
                "dimensions": "",
                "default_shipping_method": "",
                "free_methods": [
                    {
                        "id": ""
                    }
                ],
                "cost": "",
                "free_shipping": "",
                "receiver_address": ""
            }
        ],
        */
        /* ----> "bad format"
        "back_urls": [
            {
                "success": "www.somosgranada.com/contacto",
                "pending": "www.somosgranada.com/contacto",
                "failure": "www.somosgranada.com/contacto"
            }
        ],
        */
        //"notification_url": "",
        //"auto_return": "approved",
      };

  data = mp.createPreference (preference, function (err, data){
    if (err) {
        callback(null,err);
    } else {
        callback(null,data.response.sandbox_init_point);
    }
  });

}
