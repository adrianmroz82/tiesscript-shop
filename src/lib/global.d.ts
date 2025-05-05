/* eslint-disable unused-imports/no-unused-vars */
import { Database } from 'lib/database.model';

declare global {
  type Category = Database['public']['Tables']['categories']['Row'];
  type Product = Database['public']['Tables']['products']['Row'];
  type Order = Database['public']['Tables']['orders']['Row'];
  type Resource = Database['public']['Tables']['resources']['Row'];

  type ResourceImageUrl = Resource['images'][number];
}
