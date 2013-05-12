var initialValue = window.android ? window.android.getTime() : 0;

Ext.Loader.setPath({
	'Ext': 'src'
});

Ext.application({
	requires: [
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.Radio',
		'Ext.Toolbar',
		'Ext.Button',
		'Ext.Spacer'
	],
	launch: function () {
		var config = {
			xtype: 'formpanel',
			items: this.getItems()
		};
		if (Ext.os.deviceType !== 'Phone') {
			Ext.apply(config, {
				modal: true,
				height: '90%',
				width: '60%',
				centered: true,
				hideOnMaskTap: false
			});
		}
		Ext.Viewport.add(config);
	},
	getItems: function () {
		return [{
			xtype: 'fieldset',
			title: 'Screen timeout',
			defaults: {
				xtype: 'radiofield',
				name: 'timeout',
				labelWidth: '70%',
				listeners: {
					change: function (radio) {
						if (radio.getChecked()) {
							var message = radio.up('fieldset').getTitle() + ': ' + radio.getLabel();
							if (window.android) {
								window.android.setTime(radio.getValue());
								window.android.alert(message);
								window.android.exit();
							} else {
								alert(message);
							}
						}
					}
				}
			},
			items: [{
				label: '15 seconds',
				value: 15000,
				checked: 15000 === initialValue
			}, {
				label: '30 seconds',
				value: 30000,
				checked: 30000 === initialValue
			}, {
				label: '45 seconds',
				value: 45000,
				checked: 45000 === initialValue
			}, {
				label: '1 minute',
				value: 60000,
				checked: 60000 === initialValue
			}, {
				label: '2 minutes',
				value: 120000,
				checked: 120000 === initialValue
			}, {
				label: '10 minutes',
				value: 600000,
				checked: 600000 === initialValue
			}, {
				label: 'Never turn off',
				value: -1,
				checked: -1 === initialValue
			}]
		}, {
			xtype: 'toolbar',
			docked: 'bottom',
			items: [{
				xtype: 'spacer'
			}, {
				text: 'Cancel',
				handler: function() {
					if (window.android) {
						window.android.alert('Goodbye!');
						window.android.exit();
					}
				}
			}]
		}];
	}
});