
var grSysUser = new GlideRecord('sys_user');
grSysUser.addEncodedQuery("roles=itil");
grSysUser.orderBy('name');
grSysUser.setLimit(100);
grSysUser.query();
while (grSysUser.next()) {
    gs.info('name: ' + grSysUser.getValue('name'));
	gs.info('user_name: ' + grSysUser.getValue('user_name'));
	gs.info(grSysUser.sys_id);
	gs.info("");
}
gs.info(grSysUser.getRowCount());


var sys_array = [
	"0b6f2926fba90610bc45f84065efdc4e",
	"1d8a06dc47d04610d04cb6b3416d438c",
	"3321ee3347344a10d679b064116d43d1",
	"3e6f2926fba90610bc45f84065efdc1c",
	"473bdc6647f28210db6ef6afe16d432e",
	"4a01965447144610d04cb6b3416d434e",
	"543640c5fb4e4e50bc45f84065efdc8c",
	"54761292472e4610db6ef6afe16d4383",
	"6816f79cc0a8016401c5a33be04be441",
	"6df898e247f28210db6ef6afe16d435a",
	"726f2926fba90610bc45f84065efdc42",
	"7a6fe526fba90610bc45f84065efdcf7",
	"8b6f2d6647a54610d679b064116d437b",
	"8f6f2d6647a54610d679b064116d4362",
	"9ebc5cbf4700c210d04cb6b3416d435f",
	"a63b8c02479c4610f10ea005316d435f",
	"adbfd409931c4210c0fdba4e1dba10f4",
	"be6f2926fba90610bc45f84065efdc03",
	"c6a5338a475fca50db6ef6afe16d43fa",
	"c76f2d6647a54610d679b064116d436f",
	"d3b8f01b93aac61025377fb86cba107d",
	"dbed0c8247d04610d679b064116d43ce",
	"e6d24047476f421022e3759d416d43d6",
	"f26f2926fba90610bc45f84065efdc29",
	"f602d22aff338a109dbef1d2fc4fd9d9",
	"fa6fe526fba90610bc45f84065efdcde",
];

var sys_string = "sys_id=";

for(var i = 0; i < sys_array.length; i++){
	var grSysUser = new GlideRecord('sys_user');
	grSysUser.addEncodedQuery(sys_string + sys_array[i]);
	//gs.info(sys_string+sys_array[i]);
	grSysUser.query();

	while (grSysUser.next()){
	gs.info('name: ' + grSysUser.getValue('name'));
	gs.info('user_name: ' + grSysUser.getValue('user_name'));
	gs.info(grSysUser.sys_id);
	gs.info("");
}
}
