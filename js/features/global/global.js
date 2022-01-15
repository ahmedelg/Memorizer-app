/* ###########################################
							     	GLOBAL
					FUNCTION COMMON BY ALL FEATURES
   ######################################### */
class Global {
  constructor() {
    if (!Global.instance) {
      this._data = new Array();
      Global.instance = this;
    }
    // ?`exists`
    return Global.instance;
	}
	
	userActvDate() {
		const actvDate = new Date();
		return {
			year:actvDate.getFullYear(),
			// month:
				day:actvDate.getDate(),
			hour:(actvDate.getHours() > 12)?actvDate.getHours()-12:actvDate.getHours(),
			minute:actvDate.getMinutes(),
			date:actvDate.toDateString()
		}
	}


}

const featuresGlobal = new Global();
