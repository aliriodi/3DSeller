import { Schema, model, models } from 'mongoose';

const PurchaseScheme = new Schema(
    {
        user: {
            id: { type: Schema.ObjectId, ref: "User" }
        },
        products: {
            id: { type: Schema.ObjectId, ref: "Products"}
        },
        order_id: String,
        created_at: String,
        purchase: {
            amount: {
                value: String,
                currency: String
            },
            shipping: {
                full_name: String,
                address_line_1: String,
                admin_area_1: String,
                postal_code: String,
                country_code: String
            },
            payer: {
                given_name: String,
                surname: String,
            }
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)

export default models.Purchase || model('Purchase', PurchaseScheme, "purchases")