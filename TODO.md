## MVP TODO

### Add new product page

[x] show images after they are uploaded
[x] images should be shown as seperated cards, which can be reordered
[x] resize images on client side
[ ] details page loader

### ideas

[x] only one image fetched on paginated query (main_image field in products tabl, compressed even more)
[ ] for the rest of images, create product_resources (add main_image there as well, but not compressed)
[ ] missing additional compression on main_image

### bugs

[x] id of resouces not matching id of product (36 vs 37) +

### supabase migration

[ ] - cart store
[x] - sorting
[x] - pagination
[ ] - align admin panel queries

[ ] - zod validation on login form / add new product form

/admin
[ ] - logout ability

/admin/add-new-offer
[ ] - discrimation union types based on category
[ ] - loading state on Add Item button
[ ] - Save as draft - create drafts page
[ ] - category based inputs - show specific inputs after category is selected

/admin/offers
[ ] - pagination
[ ] - search
[ ] - filter by category
[ ] - edit product page - entry from both products and product page
[ ] - delete product
[ ] - ability to hide/show product
