
Ext.define('Admin.view.paciente.Paciente',{
    extend: 'Ext.panel.Panel',
    xtype:'paciente',
    requires: [
        'Admin.view.paciente.PacienteController',
        'Admin.view.paciente.PacienteModel'
    ],
    controller: 'paciente-paciente',
    viewModel: {
        type: 'paciente-paciente'
    },
    layout:{
        type:'fit',
        align:'strech'
    },
    flex:1,
    margin:20,
    cls: 'shadow',
    items:[
        {
            xtype:'grilla',
            bind:{
                store:'{pacienteStore}'
            },
            cls: 'user-grid',
            forceFit:true,
            layout:'fit',
            plugins:[
               Ext.create('Ext.grid.plugin.CellEditing',{
                  clicksToEdit: 2
               })
            ],
            /*listeners:{
                select :function( self, record, index, eOpts){
                    console.log(record);  
                } 
            },*/
            columns:
            {   
                defaults:{
                    editor: Ext.create('Ext.form.field.Text',{
                        emptyText:'Placa',
                        name:'placa',
                        selectOnFocus: true,
                        listeners: {
                            specialkey:'onSaveEnter'
                        }
                    })
                },
                items:
                    [
                    {
                        dataIndex: "nombre",
                        text:"Nombre",
                    },
                    {
                        dataIndex: "apellido",
                        text:       "Apellido",
                    },
                    {
                        dataIndex: "direccion",
                        text:       "Direccion",
                    },
                    {
                        dataIndex: "localidad",
                        text:       "Localidad",
                    },
                    {
                        dataIndex: "provincia",
                        text:       "Provincia",
                    },
                    {
                        dataIndex: "fecha_nacimiento",
                        text:       "Fecha nacimiento",
                    },
                    {
                        dataIndex: "sexo",
                        text:       "Sexo",
                    },
                    {
                        dataIndex: "telefono",
                        text:       "Telefono",
                    },
                    {
                        dataIndex: "diagnostico",
                        text:       "Diagnostico",
                    },
                    {
                        dataIndex: "fecha_ingreso",
                        text:       "Fecha ingreso",
                    },
                    {
                        dataIndex: "fecha_alta",
                        text:       "Fecha_alta"
                    },
                    {
                        xtype: 'actioncolumn',
                        cls: 'content-column',
                        width: 450,
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'fa fa-upload',
                                tooltip: 'Subir Diagnóstico',
                                handler:'upload',                       
                            }
                        ],
                        cls: 'content-column',
                        text: 'Acciones'                   
                    }
                ]
            },
            dockedItems:[
                 {
                     xtype:"toolbar",
                     items:[
                        {
                            xtype: 'textfield',
                            name: 'nombre',
                            emptyText: 'Nombre'
                        },
                        {
                            xtype: 'textfield',
                            name:"Cedula",
                            emptyText:"cedula"
                        },
                        {
                           xtype: 'button',
                           text: 'Filtrar',
                           name: 'filtrar',
                           handler:'search'
                        },
                        {
                           xtype: 'button',
                           text: 'Limpiar',
                           name: 'limpiar',
                           handler:'limpiar'
                        },
                        '->',
                        {
                           xtype: 'button',
                           text: 'Nuevo',
                           name: 'nuevo',
                           handler:'nuevo'
                        }
                     ]
                 }
            ],
             listeners:{
                scope:this,
                cellkeydown:function( self, td, cellIndex, record, tr, rowIndex, e, eOpts ){
                    var grid = self.up("grid");
                    record.set("changed",(!record.get("changed")));
                    console.log(record.get("changed"));
                }
             }             
        }
     ] 
});
