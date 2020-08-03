enum onoff {
  ON,
  OFF,
}
enum whiteblack{
黒,
白,
}

enum sence_select{
    普通,
    高感度,
    低感度,
    超低感度,
}

enum direction{
    前,
    後,
    右,
    左,
    右前,
    左前,
    停まる,
    ニュートラル,
}

enum lotation{
    左,
    右,
}

let con_le = 0;
let con_op = 0;


//% color="#3943c6" block="ユーレカ自動車" icon="\uf1b9"

namespace eureka_blocks_car {
  //% color="#ff3d03" weight=59 blockId=eurekacar_buz_set block="ﾕｰﾚｶ車で音をならす" group="1_初期設定"
  export function eurekacar_buz_set() {
    pins.analogSetPitchPin(AnalogPin.P0);
  }
  

  //% color="#ffa800" weight=99　blockId=servos_condition
  //% block="左右バランス調整 左へ |%le| 右へ" group="2　調整"
  //% le.min=-100 le.max=100
  export function condition(le: number): void {
    con_le = le;
  }

  //% color="#ffa800" weight=97　blockId=servos_op
  //% block="出力調整 |%op|" group="2　調整"
  //% op.min=-100 op.max=0
  export function servo_op(op: number): void {
    con_op = op;
  }




  //% color="#3943c6" weight=71　blockId=servos_direction
  //% block="進行方向 |%sinkou_houkou| " group="3　基本の動き"
  export function car_derection(sinkou_houkou:direction): void {
    switch(sinkou_houkou){
        case direction.前:
            if (con_le >= 0) {
            pins.servoWritePin(AnalogPin.P14,90 - (90 * (con_op + 100)) / 100 + con_le);
            pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
            }
            if (con_le < 0) {
            pins.servoWritePin(AnalogPin.P14, 90 - (90 * (con_op + 100)) / 100);
            pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100 + con_le);
            }        
        break;
        case direction.後:
            if (con_le >= 0) {
            pins.servoWritePin( AnalogPin.P14,90 + (90 * (con_op + 100)) / 100 - con_le );
            pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100);
            }
            if (con_le < 0) {
            pins.servoWritePin(AnalogPin.P14, 90 + (90 * (con_op + 100)) / 100);
            pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100 - con_le );
            }
        break;            
        case direction.左:
            pins.servoWritePin(AnalogPin.P14,90 - (90 * (con_op + 100)) / 100 );
            pins.servoWritePin(AnalogPin.P13, 90 );
        break;
        case direction.右:
            pins.servoWritePin(AnalogPin.P14,90 );
            pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100 );
        break;
        case direction.左前:
            pins.servoWritePin(AnalogPin.P14,60 );
            pins.servoWritePin(AnalogPin.P13, 100);
        break;
        case direction.右前:
            pins.servoWritePin(AnalogPin.P14,80);
            pins.servoWritePin(AnalogPin.P13, 120);
        break;
        case direction.停まる:
            pins.servoWritePin(AnalogPin.P13, 90);
            pins.servoWritePin(AnalogPin.P14, 90);
        break;
        case direction.ニュートラル:
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.digitalWritePin(DigitalPin.P14, 0);
        break;
    }
  }    
  

  
  //% color="#3943c6" weight=63blockId=servos_lotation
  //% block="回転 |%lot_houkou| " group="3　基本の動き"
  export function car_lotation(lot_houkou:lotation): void {
    switch(lot_houkou){
        case lotation.左:
            pins.servoWritePin(AnalogPin.P14,90 -(90 * (con_op + 100)) / 100 );
            pins.servoWritePin(AnalogPin.P13, 90 - (90 * (con_op + 100)) / 100);
        break;
        case lotation.右:
            pins.servoWritePin(AnalogPin.P14,90 + (90 * (con_op + 100)) / 100 );
            pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
        break;
    }

  }






  //% color="#3943c6" weight=59　blockId=servo_pro_bal
  //% block="前進方向オリジナル 左へ |%set_lr| 右へ" group="3　基本の動き"
  //% set_lr.min=-90 set_lr.max=90
  export function pro_bal(set_lr: number): void {
      pins.servoWritePin(AnalogPin.P14,90 - (90 * (con_op + 100)) / 100 );
      pins.servoWritePin(AnalogPin.P13, 90 + (90 * (con_op + 100)) / 100);
    }

  //% color="#3943c6" weight=58　blockId=servo_pro_LR
  //% block="|%lot_houkou| 車輪 出力 |%set_LR| " group="3　基本の動き"
  //% set_LR.min=-100 set_LR.max=100
  export function pro_LR(lot_houkou:lotation, set_LR: number): void {
    switch(lot_houkou){
        case lotation.左:
            pins.servoWritePin(AnalogPin.P13, 90 + (90 * set_LR) / 100);
        case lotation.右:
        pins.servoWritePin(AnalogPin.P14, 90 - (90 * set_LR) / 100);
    }
  }

  //% color="#f071bd" weight=30 blockId=auto_photo_R block="右ﾌｫﾄﾘﾌﾚｸﾀｰ" group="4　センサー"
  export function phto_R() {
    return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
  }

  //% color="#f071bd" weight=28 blockId=auto_photo_L block="左ﾌｫﾄﾘﾌﾚｸﾀｰ" group="4　センサー"
  export function phto_L() {
    return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
  }

  //% color="#d4b41f"  weight=26 block="右ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit_R| より小さい" group="4　センサー"
  //% limit_R.min=0 limit_R.max=100
  export function photo_R(limit_R: number): boolean {
    if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit_R) {
      return true;
    } else {
      return false;
    }
  }

  //% color="#d4b41f"  weight=27 block="左ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit_L| より小さい" group="4　センサー"
  //% limit_L.min=0 limit_L.max=100
  export function photo_L(limit_L: number): boolean {
    if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit_L) {
      return true;
    } else {
      return false;
    }
  }

//% color="#6041f1"  weight=23 block="右だけが |%wb| をふんだ時　　感度 |%sence| " group="3　センサー" group="4　センサー"
//% sence.min=10 sence.max=40
  export function photo_R_out( wb: whiteblack , sence : sence_select): boolean {
      if (sence == sence_select.高感度) {
      sence=10    
      }
      if (sence == sence_select.普通) {
      sence=20    
      }
      if (sence == sence_select.低感度) {
      sence=30    
      }
      if (sence == sence_select.超低感度) {
      sence=40    
      }

    switch(wb){
        case whiteblack.黒:
            if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sence && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < sence) {
            return true;
            } else {
            return false;
            }
        case whiteblack.白:
            if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sence && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 > sence) {
            return true;
            } else {
            return false;
            }
    }
  }

  //% color="#6041f1"  weight=24 block="左だけが |%wb| をふんだ時　しきい値 |%sence| " group="3　センサー" group="4　センサー"
  export function photo_L_out( wb: whiteblack ,sence : sence_select): boolean {
      if (sence == sence_select.高感度) {
      sence=10    
      }
      if (sence == sence_select.普通) {
      sence=20    
      }
      if (sence == sence_select.低感度) {
      sence=30    
      }
      if (sence == sence_select.超低感度) {
      sence=40    
      }

    switch(wb){
        case whiteblack.黒:
            if (
            
            (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sence 　&&　(pins.analogReadPin(AnalogPin.P2) / 1023) * 100 > sence
                ) {
            return true;
            } else {
            return false;
            }

        case whiteblack.白:
            if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sence &&　(pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < sence) {
            return true;
            } else {
            return false;
            }               
    
    }
  }
  //% color="#6041f1"  weight=25 block="左右とも |%wb| 線をふんでいる時　しきい値 |%sence|" group="4　センサー"
//% sence.min=10 sence.max=40
  export function photo_LR_out(wb: whiteblack , sence : sence_select): boolean {
      if (sence == sence_select.高感度) {
      sence=10    
      }
      if (sence == sence_select.普通) {
      sence=20    
      }
      if (sence == sence_select.低感度) {
      sence=30    
      }
      if (sence == sence_select.超低感度) {
      sence=40    
      }
    switch(wb){
        case whiteblack.黒:
            if (
            (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sence && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 > sence)
             {
            return true;
            } else {
            return false;
            }
    }
    switch(wb){
        case whiteblack.白:
            if (
            (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sence && (pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < sence)
             {
            return true;
            } else {
            return false;
            }
    }
}


  //% color="#009A00" weight=22 blockId=sonar_ping_2 block="きょりｾﾝｻ" group="4　センサー"
  export function ping() {
    // send
    basic.pause(20);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    pins.digitalWritePin(DigitalPin.P8, 0);
    control.waitMicros(2);
    pins.digitalWritePin(DigitalPin.P8, 1);
    control.waitMicros(10);
    pins.digitalWritePin(DigitalPin.P8, 0);
    // read
    const d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
    return Math.round(Math.idiv(d, 58) * 1.5) ;
  }

  //% color="#009A00" weight=20 block="きょりが |%limit| cmより小さく" group="4　センサー"
  //% limit.min=0 limit.max=50
  export function sonar_ping_3(limit: number): boolean {
    // send
    basic.pause(20);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    pins.digitalWritePin(DigitalPin.P8, 0);
    control.waitMicros(2);
    pins.digitalWritePin(DigitalPin.P8, 1);
    control.waitMicros(10);
    pins.digitalWritePin(DigitalPin.P8, 0);
    // read
    const d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
    if (Math.idiv(d, 58) * 1.5 < limit) {
      return true;
    } else {
      return false;
    }
  }

  //% color="#ff3d03" weight=12 blockId=auto_led_off block="ﾏｲｸﾛﾋﾞｯﾄのLEDを無効にする" group="5　ライト"
  export function auto_led_off() {
    led.enable(false);
  }

  //% color="#ff3d03" weight=11 blockId=auto_led_on block="ﾏｲｸﾛﾋﾞｯﾄのLEDを有効にする" group="5　ライト"
  export function auto_led_on() {
    led.enable(true);
  }

  //% color="#40a6ff" weight=10 blockId=auto_white_LED block="前＿白LED |%mode| " group="5　ライト"
  export function white_LED(mode: onoff) {
    if (mode == onoff.ON) {
      pins.digitalWritePin(DigitalPin.P3, 1);
    } else {
      return pins.digitalWritePin(DigitalPin.P3, 0);
    }
  }

  //% color="#ff4940" weight=8 blockId=auto_red_LED block="後ろ＿赤LED |%mode| " group="5　ライト"
  export function red_LED(mode: onoff) {
    if (mode == onoff.ON) {
      pins.digitalWritePin(DigitalPin.P15, 1);
    } else {
      return pins.digitalWritePin(DigitalPin.P15, 0);
    }
  }
}