curl -X POST \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer ACCESSTOKEN' \
"https://api.mercadopago.com/users/test_user" \
-d '{"site_id":"MLA"}'
