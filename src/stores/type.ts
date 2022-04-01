export interface ShowAddSwitch {
	importedCase: boolean;
	localConfirm: boolean;
	all: boolean;
	suspect: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	localinfeciton: boolean;
	confirm: boolean;
	dead: boolean;
	heal: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
}

export interface Total {
	dead: number;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	heal: number;
}

export interface Children {
	name: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	heal: number;
	nowSevere: number;
	noInfectH5: number;
	local_acc_confirm: number;
	confirm: number;
	importedCase: number;
	noInfect: number;
	localConfirmH5: number;
	dead: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	suspect: number;
	localConfirm: number;
	nowConfirm: number;
}

export interface ChinaAdd {
	noInfect: number;
	localConfirm: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
	nowConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	confirm: number;
	heal: number;
	dead: number;
}

export interface Diseaseh5Shelf {
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
}

export interface StatisGradeCityDetail {
	province: string;
	confirmAdd: number;
	confirm: number;
	dead: number;
	grade: string;
	city: string;
	nowConfirm: number;
	heal: number;
	date: string;
	sdate: string;
	syear: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}