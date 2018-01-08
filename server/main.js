import { Meteor } from 'meteor/meteor';

Meteor.methods({
    insertData:function(obj){
        crud.insert(obj);
    },
    onUpdate:function(obj) {
        crud.update({ _id: obj.id }, { $set: obj.data });
    }
});

Meteor.publish('crud', function(){
    return crud.find({});
});