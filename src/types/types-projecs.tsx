export type IconTypes = {
  name?: string;
  size?: number;
  color?: string;
};

export interface ModalTypes {
  title: string;
  subTitle: string;
  color?: string;
  titleColor?: string;
  subTitleColor?: string;
  buttomUpdate?: boolean;
  buttomText?: string;
  buttomContainerColor?: string;
  androidUrl?: string;
  iosUrl?: string;
}

export type InputTypes = {
  placeholderText?: string;
  name?: any;
  control?: any;
};
