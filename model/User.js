const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
     },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            },
            message: props => `${props.value} is not a valid email address`
          },
        required: [true, 'Email address is required']
    
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }    
    
    );

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

//create the User model using the UserSchema
const User = model('User', UserSchema);

//expost the User model
module.exports = User;