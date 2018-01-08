import { Meteor } from "meteor/meteor";

Template.home.events({
    'submit form.add':(e)=>{
        e.preventDefault();
        
        var obj={
            judul: $('input#judul').val(),
            penulis: $('input#penulis').val(),
            penerbit: $('input#penerbit').val(),
            tahun_terbit: $('input#tahun_terbit').val(),
            stok: $('input#stok').val(),
            description: $('textarea#description').val(),
        }

        Meteor.call('insertData', obj);
        alert('success');

        e.target.elements.judul.value = '';
        e.target.elements.penulis.value = '';
        e.target.elements.penerbit.value = '';
        e.target.elements.tahun_terbit.value = '';
        e.target.elements.stok.value = '';
        e.target.elements.description.value = '';
    },
    'click a#remove': function(event) {
        crud.remove({_id:this._id});
    },
    'click a#edit': function(event) {
        var data = crud.find({ _id:this._id });
        // console.log(data.collection._docs._map[this._id]);
        $('form.form-horizontal').addClass('edit');
        $('form.form-horizontal').removeClass('add');
        $('input#id').attr('value', this._id);
        $('input#btnAdd').attr('value', 'Update');
        $('input#judul').attr('value', data.collection._docs._map[this._id].judul);
        $('input#penulis').attr('value', data.collection._docs._map[this._id].penulis);
        $('input#penerbit').attr('value', data.collection._docs._map[this._id].penerbit);
        $('input#tahun_terbit').attr('value', data.collection._docs._map[this._id].tahun_terbit);
        $('input#stok').attr('value', data.collection._docs._map[this._id].stok);
        $('textarea#description').html(data.collection._docs._map[this._id].description);
    },
    'submit form.edit':(e) => {
        e.preventDefault();

        var obj = {
            id: $('input#id').val(),
            data: {
                judul: $('input#judul').val(),
                penulis: $('input#penulis').val(),
                penerbit: $('input#penerbit').val(),
                tahun_terbit: $('input#tahun_terbit').val(),
                stok: $('input#stok').val(),
                description: $('textarea#description').val()
            }
        }

        Meteor.call('onUpdate', obj);           
        alert('success');

        e.target.elements.judul.value = '';
        e.target.elements.penulis.value = '';
        e.target.elements.penerbit.value = '';
        e.target.elements.tahun_terbit.value = '';
        e.target.elements.stok.value = '';
        e.target.elements.description.value = '';
    }
});

Template.home.helpers({
    getData: () => {
        return crud.find();
    }
});