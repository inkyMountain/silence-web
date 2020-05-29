import {action, observable} from 'mobx';

interface GlobalTheme {
  deepest: string;
  deeper: string;
  lighter: string;
  lightest: string;
  background: string;
}

type ValueOf<T> = T[keyof T]

class GlobalThemeStore {

  constructor() {
    const deepestGray = '#2f2f2f';
    const deeperGray = '#666666';
    const lighterGray = '#d7d7d7';
    const lightestGray = '#f2f2f2';
    const hours = new Date().getHours();
    const isLightTheme = hours >= 7 && hours <= 18;
    this.globalTheme.background = isLightTheme ? 'white' : 'black';
    this.globalTheme.deepest = isLightTheme ? deepestGray : lightestGray;
    this.globalTheme.deeper = isLightTheme ? deeperGray : lighterGray;
    this.globalTheme.lighter = isLightTheme ? lighterGray : deeperGray;
    this.globalTheme.lightest = isLightTheme ? lightestGray : deepestGray;
    console.log('this.globalTheme', this.globalTheme);
  }

  @observable
  globalTheme: GlobalTheme = {
    deepest: '#2f2f2f',
    deeper: '#666666',
    lighter: '#d7d7d7',
    lightest: '#f2f2f2',
    background: 'black'
  };

  @action
  updateGlobalTheme = (key: keyof GlobalTheme, value: ValueOf<GlobalTheme>) => {
    this.globalTheme[key] = value;
  };
}

export default new GlobalThemeStore();
