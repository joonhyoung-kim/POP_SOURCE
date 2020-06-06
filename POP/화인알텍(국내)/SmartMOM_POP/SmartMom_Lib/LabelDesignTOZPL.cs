using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using System.Net;
using System.Net.Sockets;
using System.Net.NetworkInformation;
using System.Windows.Forms;
using System.IO.Ports;
using System.Threading;
using SmartMom_Lib;

namespace SmartMom_Lib
{
    public class LabelDesignTOZPL
    {
        Socket _csocket;

        DataSet _macDs = new DataSet();

        public LabelDesignTOZPL()
        {
            
        }

        private void SendData(string script, string ip, string port)
        {
            try
            {
                IPEndPoint endpoint = new IPEndPoint(IPAddress.Parse(ip), int.Parse(port));

                byte[] sData = new byte[20000];

                _csocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                _csocket.Connect(endpoint);


                sData = System.Text.Encoding.UTF8.GetBytes(script);
                int retbuf = _csocket.Send(sData);

                System.Threading.Thread.Sleep(10);
                _csocket.Shutdown(SocketShutdown.Send);
                _csocket.Close();
            }
            catch(Exception ex)
            {
                Console.WriteLine("Print Out 에러");
            }
        }

        #region Default MacAddress 취득
        /// <summary>
        /// 디풀트 맥어드스 취득
        /// </summary>
        /// <returns>디풀트 맥어드레스</returns>

        public string getDefalutMacAddress()
        {
            const int MIN_MAC_ADDR_LENGTH = 12;
            string macAddress = string.Empty;
            long maxSpeed = -1;

            foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                string aaa = "Found MAC Address: " + nic.GetPhysicalAddress() +
                    " Type: " + nic.NetworkInterfaceType;

                string tempMac = nic.GetPhysicalAddress().ToString();
                if (nic.Speed > maxSpeed &&
                    !string.IsNullOrEmpty(tempMac) &&
                    tempMac.Length >= MIN_MAC_ADDR_LENGTH)
                {
                    string bbb = "New Max Speed = " + nic.Speed + ", MAC: " + tempMac;
                    maxSpeed = nic.Speed;
                    macAddress = tempMac;
                }
            }

            return macAddress;
        }
        #endregion

        #region 라인 스크립트
        /// <summary>
        /// 
        /// </summary>
        /// <param name="x_position">X축 시작점(Pixel)</param> 
        /// <param name="y_position">Y축 시작점(Pixel)</param> 
        /// <param name="box_width">X축 Width(Pixel)</param> 
        /// <param name="box_height">Y축 Height(Pixel)</param> 
        /// <param name="line_thikness">선굵기(Pixel)</param> 
        /// <param name="label_value">FILL : 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)</param> 
        /// <returns></returns>
        public string LineScript(string x_position, string y_position, string box_width, string box_height, string line_thikness, string label_value)
        {
            if(label_value == "FILL")
            {
                line_thikness = box_width;
            }
            string retbuf = "^FO" + x_position.Trim() + "," + y_position.Trim() + "^GB" + box_width.Trim() + "," + box_height.Trim() + "," + line_thikness.Trim() + "^FS";

            return retbuf;
        }

        #endregion

        #region 영문자 스크립트
        public string EnglishScript(string x_position, string y_position, string box_width, string box_height, string line_thikness, string label_value, string lanscape)
        {
            string retbuf = "";
            int font_width_pix_size = 0;
            int font_length = 0;
            double font_length_float = 0;

            string[] labal_value_array = label_value.Select(c => c.ToString()).ToArray();

            for(int i=0;i< labal_value_array.Length;i++)
            {
                font_length_float += IsChar(labal_value_array[i]);
            }

            font_length = (int)font_length_float;
            if (font_length > 0)
            {
                if (lanscape == "N")
                {
                    font_width_pix_size = int.Parse(box_width.Trim()) / font_length;
                }
                else
                {
                    font_width_pix_size = int.Parse(box_height.Trim()) / font_length;
                }
                //font_width_pix_size = (int)(font_width_pix_size * 1.5);
                // 퍼센트 증가 공식 : 숫자 X (1 + 퍼센트 ÷ 100)
                // 30% 증가
                font_width_pix_size = (int)(font_width_pix_size + font_width_pix_size * (1.0 + 20.0 / 100.0));
            }
            string y_position_box_height_add = "";
            string box_height_calc_position = "";

            y_position_box_height_add = (double.Parse(y_position.Trim()) + double.Parse(box_height.Trim())).ToString();

            if (lanscape == "N")
            {
                box_height_calc_position = ((int)(double.Parse(box_height.Trim()) * 1.2)).ToString();
            }
            else
            {
                box_height_calc_position = ((int)(double.Parse(box_width.Trim()) * 1.2)).ToString();
            }
            if (line_thikness != "0")
            {
                retbuf = LineScript(x_position, y_position, box_width, box_height, line_thikness, "");
            }

            int compbuf = (int)(double.Parse(box_height_calc_position) * 0.8);

            if (font_width_pix_size > compbuf)
            {
                font_width_pix_size = (int)(double.Parse(box_height_calc_position) * 0.8);
            }
            if(lanscape =="N")
            {
                retbuf += "^FT" + x_position.Trim() + "," + y_position_box_height_add + "^A0" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString() + "^FH\\^FD" + label_value + "^FS";
            }
            else
            {
                retbuf += "^FT" + x_position.Trim() + "," + y_position.Trim() + "^A0" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString() + "^FH\\^FD" + label_value + "^FS";
            }
            return retbuf;
        }

        /// <summary>
        /// 대문자, 소문자, 숫자에 따라 영문자 인쇄시 너비가 결정을 시키는 메소드
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        private double IsChar(string s)
        {
            bool check = false;
            char c = char.Parse(s);
            check = (0x40 < c && 0x5b > c) ? true : false;
            if (check == true)
            {
                // 영 대문자 일경우
                return 1;
            }

            if (check == false)
            {
                check = char.IsDigit(c);

                if (check == true)
                {
                    // 숫자 일경우
                    return 0.925;
                }
            }

            // 영 소문자/한글 일 경우
            return 0.8;
        }
        #endregion

        #region 한글 스크립트
        public string KoreaScript(string x_position, string y_position, string box_width, string box_height, string line_thikness, string label_value, string lanscape)
        {
            string retbuf = "";
            double font_width_pix_size = 0;
            double font_length_float = 0;

            string[] labal_value_array = label_value.Select(c => c.ToString()).ToArray();

            if(labal_value_array.Length == 0)
            {
                return "";
            }

            for (int i = 0; i < labal_value_array.Length; i++)
            {
                font_length_float += IsChar_Kor(labal_value_array[i]);
            }

            if (font_length_float > 0)
            {
                if (lanscape == "N")
                {
                    font_width_pix_size = (double)(double.Parse(box_width.Trim()) / font_length_float);
                }
                else
                {
                    font_width_pix_size = (double)(double.Parse(box_height.Trim()) / font_length_float);
                }
            }
            string y_position_box_height_add = "";
            string box_height_calc_position = "";

            //12를 빼는 이유 : 한글 폰트의 경우 약 10픽셀정도 아래로 밀리는 현상이 있어 y시작점을 강제로 조정(글자는 좌측아래가 기준임)
            y_position_box_height_add = (double.Parse(y_position.Trim()) + double.Parse(box_height.Trim()) - 10).ToString();


            if (lanscape == "N")
            {
                box_height_calc_position = ((int)(double.Parse(box_height.Trim()) * 1.0)).ToString();
            }
            else
            {
                box_height_calc_position = ((int)(double.Parse(box_width.Trim()) * 1.0)).ToString();
            }
            if (line_thikness != "0")
            {
                retbuf = LineScript(x_position, y_position, box_width, box_height, line_thikness, "");
            }

            double compbuf = (double.Parse(box_height_calc_position) * 0.65);

            if (font_width_pix_size > compbuf)
            {
                font_width_pix_size = (double)(double.Parse(box_height_calc_position) * 0.7);
            }


            if (lanscape == "N")
            {
                retbuf += "^FT" + x_position.Trim() + "," + y_position_box_height_add + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + "^FD" + label_value + "^FS";
                retbuf += "^FT" + (double.Parse(x_position.Trim()) + 1.0).ToString() + "," + y_position_box_height_add + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + "^FD" + label_value + "^FS";
                retbuf += "^FT" + x_position.Trim() + "," + (double.Parse(y_position_box_height_add) + 1).ToString() + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + "^FD" + label_value + "^FS";
                //retbuf += "^FT" + (double.Parse(x_position.Trim()) + 1.0).ToString() + "," + (double.Parse(y_position_box_height_add) + 1).ToString() + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + "^FD" + label_value + "^FS";
            }
            else
            {
                retbuf += "^FT" + x_position.Trim() + "," + y_position.Trim() + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + " ^ FD" + label_value + "^FS";
                retbuf += "^FT" + (double.Parse(x_position.Trim()) + 1.0).ToString() + "," + y_position.Trim() + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + " ^ FD" + label_value + "^FS";
                retbuf += "^FT" + x_position.Trim() + "," + (double.Parse(y_position.Trim()) + 1.0).ToString() + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + " ^ FD" + label_value + "^FS";
                //retbuf += "^FT" + (double.Parse(x_position.Trim()) +1.0).ToString() + "," + (double.Parse(y_position.Trim()) + 1.0).ToString() + "^A1" + lanscape + "," + box_height_calc_position + "," + font_width_pix_size.ToString("0.##") + " ^ FD" + label_value + "^FS";
            }
            return retbuf;
        }


        /// <summary>
        /// 대문자, 소문자, 숫자에 따라 영문자 인쇄시 너비가 결정을 시키는 메소드
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        private double IsChar_Kor(string s)
        {
            bool check = false;
            char c = char.Parse(s);
            check = (0x40 < c && 0x5b > c) ? true : false;
            if (check == true)
            {
                // 영 대문자 일경우
                return 1;
            }

            check = (0x60 < c && 0x7b > c) ? true : false;
            if (check == true)
            {
                // 영 소문자 일경우
                return 0.8;
            }

            if (check == false)
            {
                check = char.IsDigit(c);

                if (check == true)
                {
                    // 숫자 일경우
                    return 0.9;
                }
            }

            if(s==" ")
            {
                return 0.1;
            }

            // 영 소문자/한글 일 경우
            return 0.9;
        }

        #endregion

        #region CODE 128 스크립트
        public string Code128Script(string x_position, string y_position, string barcode_module_width, string barcode_height, string landscape, string barcode_text_under_yn, string label_value)
        {
            string barcode_ratio = "2";
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                //retbuf = "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BC" + landscape.Trim() + "," + barcode_height.Trim() + "," + barcode_text_under_yn + "^FD" + label_value + "^FS";
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BC" + landscape.Trim() + "," + barcode_height.Trim() + "," + barcode_text_under_yn + "^FD" + label_value + "^FS";
                //ean128 test
                //retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BC" + landscape.Trim() + "," + barcode_height.Trim() + "," + barcode_text_under_yn + ",N,N,U^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE 39 스크립트
        public string Code39Script(string x_position, string y_position, string barcode_module_width, string barcode_ratio, string barcode_height, string landscape, string barcode_text_under_yn, string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^B3" + landscape.Trim() + ",N," + barcode_height.Trim() + "," + barcode_text_under_yn + ",N^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE 93 스크립트
        public string Code93Script(string x_position, string y_position, string barcode_module_width, string barcode_ratio, string barcode_height, string landscape, string barcode_text_under_yn, string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BA" + landscape.Trim() + barcode_height.Trim() + "," + barcode_text_under_yn + ",N,N^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE EAN-13 스크립트
        public string CodeEAN13Script(string x_position, string y_position, string barcode_module_width, string barcode_height, string landscape, string barcode_text_under_yn, string label_value)
        {
            string barcode_ratio = "2";
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BE" + landscape.Trim() + "," + barcode_height.Trim() + "," + barcode_text_under_yn + ",N^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE EAN-8 스크립트
        public string CodeEAN8Script(string x_position, string y_position, string barcode_module_width, string barcode_height, string landscape, string barcode_text_under_yn, string label_value)
        {
            string barcode_ratio = "2";
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^B8" + landscape.Trim() + "," + barcode_height.Trim() + "," + barcode_text_under_yn + ",N^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE UPC 스크립트
        public string CodeUPCScript(string x_position, string y_position, string barcode_module_width, string barcode_height, string landscape, string barcode_text_under_yn, string label_value)
        {
            string barcode_ratio = "2";
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "," + barcode_height.Trim() + "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BU" + landscape.Trim() + "," + barcode_height.Trim() + "," + barcode_text_under_yn + ",N,Y^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE PDF417 스크립트
        public string CodePDF417Script(string x_position, string y_position, string barcode_module_width, string barcode_2d_size, string landscape, string label_value)
        {
            string barcode_ratio = "2";
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "^FO" + x_position.Trim() + "," + y_position.Trim() + "^B7" + landscape.Trim() + "," + barcode_2d_size.Trim() + ",0,,,N^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE QR 스크립트
        public string CodeQRScript(string x_position, string y_position, string barcode_module_width, string barcode_2d_size, string landscape, string label_value)
        {
            string retbuf = "";
            //string barcode_ratio = "2";
            //string retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "^FO" + x_position.Trim() + "," + y_position.Trim() + "^BQ" + landscape.Trim() + ",1," + barcode_2d_size.Trim() + "^FD" + label_value + "^FS";
            if(label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^FO" + x_position.Trim() + "," + y_position.Trim() + "^BQ" + landscape.Trim() + ",2," + barcode_2d_size.Trim() + "^FDQA," + label_value + "^FS";
                //retbuf = "^FT" + x_position.Trim() + "," + y_position.Trim() + ",2^BQ" + landscape.Trim() + ",2," + barcode_2d_size.Trim() + "^FDQA," + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region CODE QR(FT) 스크립트
        public string CodeQRFPScript(string x_position, string y_position, string barcode_module_width, string barcode_2d_size, string landscape, string label_value)
        {
            string retbuf = "";
            //string barcode_ratio = "2";
            //string retbuf = "^BY" + barcode_module_width.Trim() + "," + barcode_ratio.Trim() + "^FO" + x_position.Trim() + "," + y_position.Trim() + "^BQ" + landscape.Trim() + ",1," + barcode_2d_size.Trim() + "^FD" + label_value + "^FS";
            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^FT" + x_position.Trim() + "," + y_position.Trim() + ",2^BQ" + landscape.Trim() + ",2," + barcode_2d_size.Trim() + "^FDQA," + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region DATA Matrix 스크립트
        public string CodeMatrixScript(string x_position, string y_position, string barcode_module_width, string barcode_2d_size, string landscape, string label_value)
        {
            string retbuf = "";
            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^FT" + x_position.Trim() + "," + y_position.Trim() + "^BX" + landscape.Trim() + "," + barcode_2d_size.Trim() + ",200,0,0,1^FD" + label_value + "^FS";
            }

            return retbuf;
        }
        #endregion

        #region PRINT Darkness 설정
        public string PrintDarkness(string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "~SD" + label_value;
            }

            return retbuf;
        }
        #endregion

        #region PRINT Language 설정
        public string PrintLanguage(string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^KL" + label_value;
            }

            return retbuf;
        }
        #endregion

        #region PRINT Width 설정
        public string PrintWidth(string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^PW" + label_value;
            }

            return retbuf;
        }
        #endregion

        #region PRINT Top Margin 설정
        public string PrintTopMargin(string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^LT" + label_value;
            }

            return retbuf;
        }
        #endregion

        #region PRINT Left Margin 설정
        public string PrintLeftMargin(string label_value)
        {
            string retbuf = "";

            if (label_value.Trim() == "")
            {
                retbuf = "";
            }
            else
            {
                retbuf = "^LS" + label_value;
            }

            return retbuf;
        }
        #endregion


        #region MM를 해상도에 맞게 PIX로 리턴(디자인작업은 200dpi 기준임)
        private string return_mmtopix(string strmm, string strpix)
        {
            string retbuf = "";

            if(strmm.Trim() == "")
            {
                strmm = "0";
            }

            if (strpix.Trim() == "")
            {
                strpix = "0";
            }

            double calcPIX = 0;

            try
            {
                calcPIX = double.Parse(strmm) * (double)(clsStatic._dpiPixcel);
            }
            catch
            {
                calcPIX = double.Parse(strpix);
            }

            retbuf = calcPIX.ToString();

            return retbuf;
        }
        #endregion

        #region 바코드 넓이를 해상도에 맞게 리턴(디자인작업은 200dpi 기준임)
        private string return_widthto(string strwidth)
        {
            string retbuf = "";

            if (strwidth.Trim() == "")
            {
                strwidth = "0";
            }

            double calcWIDTH = 0;

            try
            {
                //100dpi
                if (clsStatic._dpiPixcel == 4)
                {
                    calcWIDTH = double.Parse(strwidth) / 2;
                }
                //200dpi
                if (clsStatic._dpiPixcel == 8)
                {
                    calcWIDTH = double.Parse(strwidth);
                }
                //300dpi
                else if (clsStatic._dpiPixcel == 12)
                {
                    calcWIDTH = double.Parse(strwidth) * 1.5;
                }
                //400dpi
                else if (clsStatic._dpiPixcel == 16)
                {
                    calcWIDTH = double.Parse(strwidth) * 1.5;
                }
                //500dpi
                else if (clsStatic._dpiPixcel == 20)
                {
                    calcWIDTH = double.Parse(strwidth) * 2;
                }
                //600dpi
                else if (clsStatic._dpiPixcel == 24)
                {
                    calcWIDTH = double.Parse(strwidth) * 2.5;
                }

            }
            catch
            {
                calcWIDTH = double.Parse(strwidth);
            }

            retbuf = calcWIDTH.ToString();

            return retbuf;
        }
        #endregion

        #region DataTable to ZPL 스크립트 생성
        public string DataTable_TO_ZPL_Script(DataTable _scriptDt)
        {
            string label_script = "";
            string x_position = "";
            string y_position = "";
            string box_width = "";
            string box_height = "";
            string line_thikness = "";
            string label_value = "";
            string landscape = "";
            string barcode_module_width = "";
            string barcode_height = "";
            string barcode_text_under_yn = "";
            string barcode_ratio = "";
            string barcode_2d_size = "";

            label_script = "^XA";

            DataRow[] drs = _scriptDt.Select("METHODID = 'STRING_KOR'");

            if (drs.Length > 0)
            {
                label_script = @"^XA
^SEE:UHANGUL.DAT
^CW1,E: SLIMGULIM.FNT
^CI28";
            }

            for (int i = 0; i < _scriptDt.Rows.Count; i++)
            {
                //공통

                /*
                 * 픽셀단위로 인쇄하는 소스 임.
                 * 테스트를 위하여 해당 소스는 보관.
                x_position            = _scriptDt.Rows[i]["X_POSITION_PIX"].ToString();
                y_position            = _scriptDt.Rows[i]["Y_POSITION_PIX"].ToString();
                box_width             = _scriptDt.Rows[i]["WIDTH_AREA_PIX"].ToString();
                box_height            =  _scriptDt.Rows[i]["HEIGHT_AREA_PIX"].ToString();
                line_thikness         = _scriptDt.Rows[i]["LINE_THICKNESS"].ToString();
                label_value           = _scriptDt.Rows[i]["LABEL_VALUE"].ToString();
                landscape             = _scriptDt.Rows[i]["LANDSCAPE"].ToString();
                barcode_module_width  = _scriptDt.Rows[i]["BARCODE_MODULE_WIDTH"].ToString();
                barcode_height        =  _scriptDt.Rows[i]["BARCODE_HEIGHT_PIX"].ToString();
                barcode_text_under_yn = _scriptDt.Rows[i]["BARCODE_TEXT_UNDER_YN"].ToString();
                barcode_ratio         = _scriptDt.Rows[i]["BARCODE_RATIO"].ToString();
                barcode_2d_size       = _scriptDt.Rows[i]["BARCODE_2D_SIZE"].ToString();
                */
                
                x_position            = return_mmtopix(_scriptDt.Rows[i]["XPOSITIONMM"].ToString(), _scriptDt.Rows[i]["XPOSITIONPIX"].ToString());
                y_position            = return_mmtopix(_scriptDt.Rows[i]["YPOSITIONMM"].ToString(), _scriptDt.Rows[i]["YPOSITIONPIX"].ToString());
                box_width             = return_mmtopix(_scriptDt.Rows[i]["WIDTHAREAMM"].ToString(), _scriptDt.Rows[i]["WIDTHAREAPIX"].ToString());
                box_height            = return_mmtopix(_scriptDt.Rows[i]["HEIGHTAREAMM"].ToString(), _scriptDt.Rows[i]["HEIGHTAREAPIX"].ToString());
                line_thikness         = _scriptDt.Rows[i]["LINETHICKNESS"].ToString();
                label_value           = _scriptDt.Rows[i]["LABELVALUE"].ToString();
                landscape             = _scriptDt.Rows[i]["LANDSCAPE"].ToString();
                barcode_module_width  = return_widthto(_scriptDt.Rows[i]["BARCODEMODULEWIDTH"].ToString().Trim());
                barcode_height        = return_mmtopix(_scriptDt.Rows[i]["BARCODEHEIGHTMM"].ToString(), _scriptDt.Rows[i]["BARCODEHEIGHTPIX"].ToString());
                barcode_text_under_yn = _scriptDt.Rows[i]["BARCODETEXTUNDERYN"].ToString();
                barcode_ratio         = return_widthto(_scriptDt.Rows[i]["BARCODERATIO"].ToString().Trim());
                barcode_2d_size       = return_widthto(_scriptDt.Rows[i]["BARCODE2DSIZE"].ToString().Trim());
                


                //라인오브젝트 스크립트 리턴

                if (_scriptDt.Rows[i]["METHODID"].ToString() == "LABEL_BOX_LINE")
                {
                    label_script += LineScript(x_position, y_position, box_width, box_height, line_thikness, label_value);
                    continue;
                }

                //영문자 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "STRING_ENG")
                {

                    label_script += EnglishScript(x_position, y_position, box_width, box_height, line_thikness, label_value, landscape);
                    continue;
                }

                //한글 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "STRING_KOR")
                {

                    label_script += KoreaScript(x_position, y_position, box_width, box_height, line_thikness, label_value, landscape);
                    continue;
                }

                //Code128 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_128")
                {
                    label_script += Code128Script(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                    continue;
                }

                //Code39 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_39")
                {
                    label_script += Code39Script(x_position, y_position, barcode_module_width, barcode_ratio, barcode_height, landscape, barcode_text_under_yn, label_value);
                    continue;
                }

                //Code93 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_93")
                {
                    label_script += Code93Script(x_position, y_position, barcode_module_width, barcode_ratio, barcode_height, landscape, barcode_text_under_yn, label_value);
                    continue;
                }

                //Code EAN-13 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_EAN-13")
                {
                    label_script += CodeEAN13Script(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                    continue;
                }

                //Code EAN-8 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_EAN-8")
                {
                    label_script += CodeEAN8Script(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                    continue;
                }

                //Code UPC 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_UPC")
                {
                    label_script += CodeUPCScript(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                    continue;
                }

                //Code PDF417 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_PDF417")
                {
                    label_script += CodePDF417Script(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value); continue;
                    continue;
                }

                //QR Code 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_QR")
                {
                    label_script += CodeQRScript(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value); continue;
                    continue;
                }

                //QR Code(FT) 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_QR(FT)")
                {
                    label_script += CodeQRFPScript(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value); continue;
                    continue;
                }

                //QR Code 스크립트 리턴
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "BARCODE_MATRIX")
                {
                    label_script += CodeMatrixScript(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value); continue;
                    continue;
                }

                //PRINT Setting Darkness 설정
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "DARKNESS")
                {
                    label_script += PrintDarkness(label_value); continue;
                    continue;
                }

                //PRINT Setting Language 설정
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "LANGUAGE")
                {
                    label_script += PrintLanguage(label_value); continue;
                    continue;
                }

                //PRINT Width 설정
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "PRINTWIDTH")
                {
                    label_script += PrintWidth(label_value); continue;
                    continue;
                }

                //PRINT Top Margin 설정
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "PRINTTOP")
                {
                    label_script +=  PrintTopMargin(label_value); continue;
                    continue;
                }

                //PRINT Left Margin 설정
                if (_scriptDt.Rows[i]["METHODID"].ToString() == "PRINTLEFT")
                {
                    label_script += PrintLeftMargin(label_value); continue;
                    continue;
                }
            }
            label_script += "^XZ";
            return label_script;
        }
        #endregion

        #region DataGridView to ZPL 스크립트 생성
        public void DataGridView_TO_ZPL_Script(ref ExGrid grdLabelObject, string printPort)
        {
            string label_script = "";
            bool row_check = true;
            string x_position = "";
            string y_position = "";
            string box_width = "";
            string box_height = "";
            string line_thikness = "";
            string label_value = "";
            string landscape = "";
            string barcode_module_width = "";
            string barcode_height = "";
            string barcode_text_under_yn = "";
            string barcode_ratio = "";
            string barcode_2d_size = "";

            LabelDesignTOZPL label = new LabelDesignTOZPL();
            label_script = "^XA";

            for(int i=0;i< grdLabelObject.Rows.Count; i++)
            {
                if(grdLabelObject["METHODID", i].Value.ToString() == "STRING_KOR")
                {
                    label_script = @"^XA
^SEE:UHANGUL.DAT
^CW1,E: SLIMGULIM.FNT
^CI28";
                    break;
                }
            }

            for (int i=0;i<grdLabelObject.Rows.Count;i++)
            {
                row_check = (bool)(grdLabelObject["row_check", i].Value);

                if(row_check == true)
                {
                    //공통
                    x_position            = return_mmtopix(grdLabelObject["XPOSITIONMM", i].Value.ToString(), grdLabelObject["XPOSITIONPIX", i].Value.ToString());
                    y_position            = return_mmtopix(grdLabelObject["YPOSITIONMM", i].Value.ToString(), grdLabelObject["YPOSITIONPIX", i].Value.ToString());
                    box_width             = return_mmtopix(grdLabelObject["WIDTHAREAMM", i].Value.ToString(), grdLabelObject["WIDTHAREAPIX", i].Value.ToString());
                    box_height            = return_mmtopix(grdLabelObject["HEIGHTAREAMM", i].Value.ToString(), grdLabelObject["HEIGHTAREAPIX", i].Value.ToString());
                    line_thikness         = grdLabelObject["LINETHICKNESS", i].Value.ToString();
                    label_value           = grdLabelObject["LABELVALUE", i].Value.ToString();
                    landscape             = grdLabelObject["LANDSCAPE", i].Value.ToString();
                    barcode_module_width  = return_widthto(grdLabelObject["BARCODEMODULEWIDTH", i].Value.ToString());
                    barcode_height        = return_mmtopix(grdLabelObject["BARCODEHEIGHTMM", i].Value.ToString(), grdLabelObject["BARCODEHEIGHTPIX", i].Value.ToString());
                    barcode_text_under_yn = grdLabelObject["BARCODETEXTUNDERYN", i].Value.ToString();
                    barcode_ratio         = return_widthto(grdLabelObject["BARCODERATIO", i].Value.ToString());
                    barcode_2d_size       = return_widthto(grdLabelObject["BARCODE2DSIZE", i].Value.ToString());

                    //라인오브젝트 스크립트 리턴

                    if (grdLabelObject["METHODID", i].Value.ToString() == "LABEL_BOX_LINE")
                    {
                        label_script += label.LineScript(x_position, y_position, box_width, box_height, line_thikness, label_value);
                        continue;
                    }

                    //영문자 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "STRING_ENG")
                    {
                       
                        label_script += label.EnglishScript(x_position, y_position, box_width, box_height, line_thikness, label_value, landscape);
                        continue;
                    }

                    //한글 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "STRING_KOR")
                    {
                        //굴림체가 너무 얇아 굵게 찍기 위하여 2번 실행(x축, y축 0.5mm씩 이동)
                        label_script += label.KoreaScript(x_position, y_position, box_width, box_height, line_thikness, label_value, landscape);
                        continue;
                    }

                    //Code128 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_128")
                    {
                        label_script += label.Code128Script(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                        continue;
                    }

                    //Code39 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_39")
                    {
                        label_script += label.Code39Script(x_position, y_position, barcode_module_width, barcode_ratio, barcode_height, landscape, barcode_text_under_yn, label_value);
                        continue;
                    }

                    //Code39 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_93")
                    {
                        label_script += label.Code93Script(x_position, y_position, barcode_module_width, barcode_ratio, barcode_height, landscape, barcode_text_under_yn, label_value);
                        continue;
                    }

                    //Code EAN-13 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_EAN-13")
                    {
                        label_script += label.CodeEAN13Script(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                        continue;
                    }

                    //Code EAN-8 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_EAN-8")
                    {
                        label_script += label.CodeEAN8Script(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                        continue;
                    }

                    //Code UPC 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_UPC")
                    {
                        label_script += label.CodeUPCScript(x_position, y_position, barcode_module_width, barcode_height, landscape, barcode_text_under_yn, label_value);
                        continue;
                    }

                    //Code PDF417 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_PDF417")
                    {
                        label_script += label.CodePDF417Script(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value);
                        continue;
                    }

                    //QR코드 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_QR")
                    {
                        label_script += label.CodeQRScript(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value);
                        continue;
                    }

                    //QR코드(FT) 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_QR(FT)")
                    {
                        label_script += label.CodeQRFPScript(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value);
                        continue;
                    }

                    //Data Matrix 스크립트 리턴
                    if (grdLabelObject["METHODID", i].Value.ToString() == "BARCODE_MATRIX")
                    {
                        label_script += label.CodeMatrixScript(x_position, y_position, barcode_module_width, barcode_2d_size, landscape, label_value);
                        continue;
                    }
                }
            }
            label_script += "^XZ";

            string[] printStrs = printPort.Split('^');

            if (printStrs[0] == "TCP")
            {
                string[] portStrs = printStrs[1].Split('/');
                SendData(label_script, portStrs[0], portStrs[1]);
            }
            //else if (printStrs[0] == "COM")
            else if (printStrs[0].IndexOf("COM") == 0)
            {
                SerialPort serialPort = new SerialPort();
                //serialPort.PortName = printStrs[1];
                serialPort.PortName = printStrs[0];
                serialPort.Parity = Parity.None;
                serialPort.BaudRate = 9600;
                serialPort.DataBits = 8;
                serialPort.StopBits = StopBits.One;
                serialPort.Open();
                if (serialPort.IsOpen)
                {
                    serialPort.Encoding = Encoding.UTF8;

                    serialPort.Write(label_script);
                    System.Threading.Thread.Sleep(10);
                    serialPort.Close();
                }
                else
                {
                    MessageBox.Show(printStrs[1] + "포트가 오픈되지 않습니다!");
                }

            }
            else if (printStrs[0] == "LPT")
            {

                LptPrint CurrLptCtrl = new LptPrint(printStrs[1].ToLower());
                CurrLptCtrl.Open();
                CurrLptCtrl.Write(label_script);
                System.Threading.Thread.Sleep(10);
                CurrLptCtrl.Close();
            }


        }
        #endregion

        /// <summary>
        /// DataTable로 된 여러건의 데이터를 인쇄할때 사용함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="sourceDt">실 데이터(바인딩 용)</param>
        /// <param name="basicDs">필드값이 정의 되어 있는 Basic/Combination 필드</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        public void bindDataTable_To_ZPL_MAIN(DataTable designDt, DataTable sourceDt, DataSet basicDs, string printPort)
        {
            DataTable basicDt = basicDs.Tables["BASIC_CUR"];
            DataTable combiDt = basicDs.Tables["COMBI_CUR"];

            string strOutport = basicDs.Tables["MAC_CUR"].Rows[0][printPort].ToString().Trim();
            if(strOutport == "" || strOutport == "NONE")
            {
                MessageBox.Show("프린터 출력 정보가 정확하지 않습니다! 확인하여 주세요!(" + printPort + ")");
                return;
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                bindDataTable_To_ZPL(dt, dr, basicDt, strOutport);
                //bindDataTable_To_ZPL(dt, dr, basicDt, combiDt, strOutport);
            }

            designDt.Dispose();
            basicDt.Dispose();
            combiDt.Dispose();
        }

        /// <summary>
        /// DataTable로 된 여러건의 데이터를 인쇄할때 사용함.
        /// 화면을 refresh하지 않아도 최신 출력포트정보를 가져와서 인쇄하는 기능 포함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="basicDs">필드값이 정의 되어 있는 Basic/Combination 필드</param>
        /// <param name="sourceDt">실 데이터(바인딩 용)</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        /// <param name="macaddress">현재 컴퓨터의 맥어드레스값</param>
        public void bindDataTable_To_ZPL_MAIN(DataTable designDt, DataTable sourceDt, DataSet basicDs, string printPort, string macaddress)
        {
            //DataSet macDs = clsLabelSet.mac_info_search(macaddress);
            DataTable basicDt = basicDs.Tables["BASIC_CUR"];
            DataTable combiDt = basicDs.Tables["COMBI_CUR"];

            string strOutport = basicDs.Tables["MAC_CUR"].Rows[0][printPort].ToString().Trim();
            if (strOutport == "" || strOutport == "NONE")
            {
                MessageBox.Show("프린터 출력 정보가 정확하지 않습니다! 확인하여 주세요!(" + printPort + ")");
                return;
            }

            string strSleep = basicDs.Tables["MAC_CUR"].Rows[0]["sleep"].ToString().Trim();
            string[] Sleeps = strSleep.Split('^');

            int productall = 0;
            int productcnt = 0;
            int intSleep = 0;
            if (Sleeps.Length != 2)
            {
                productall = 10;
                intSleep = 2000;
            }
            else
            {
                productall = int.Parse(Sleeps[0]);
                intSleep = int.Parse(Sleeps[1]);
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                productcnt++;

                if (productcnt >= productall)
                {
                    Thread.Sleep(intSleep);
                    productcnt = 0;
                }

                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                //bindDataTable_To_ZPL(dt, dr, basicDt, combiDt, strOutport);
                bindDataTable_To_ZPL(dt, dr, basicDt, strOutport);
            }

            designDt.Dispose();
        }

        /// <summary>
        /// DataTable로 된 여러건의 데이터를 인쇄할때 사용함.
        /// 화면을 refresh하지 않아도 최신 출력포트정보를 가져와서 인쇄하는 기능 포함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="sourceDt">실 데이터(바인딩 용)</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        /// <param name="macaddress">현재 컴퓨터의 맥어드레스값</param>
        public void bindDataTable_To_ZPL_MAIN(DataTable designDt, DataTable sourceDt, string printPort, string macaddress)
        {
            DataSet macDs = clsLabelSet.basic_info_search(macaddress);

            string strOutport = macDs.Tables["MAC_CUR"].Rows[0][printPort].ToString().Trim();
            if (strOutport == "" || strOutport == "NONE")
            {
                MessageBox.Show("프린터 출력 정보가 정확하지 않습니다! 확인하여 주세요!(" + printPort + ")");
                return;
            }

            string strSleep = macDs.Tables["MAC_CUR"].Rows[0]["sleep"].ToString().Trim();
            string[] Sleeps = strSleep.Split('^');

            int productall = 0;
            int productcnt = 0;
            int intSleep = 0;
            if (Sleeps.Length != 2)
            {
                productall = 10;
                intSleep = 2000;
            }
            else
            {
                productall = int.Parse(Sleeps[0]);
                intSleep = int.Parse(Sleeps[1]);
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                productcnt++;

                if (productcnt >= productall)
                {
                    Thread.Sleep(intSleep);
                    productcnt = 0;
                }

                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                bindDataTable_To_ZPL(dt, dr, strOutport);
            }

            designDt.Dispose();
        }

        /// <summary>
        /// DataTable로 된 한건의 데이터를 인쇄할때 사용함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="sourceDic">실 데이터(바인딩 용)</param>
        /// <param name="basicDs">필드값이 정의 되어 있는 Basic/Combination 필드</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        public void bindDictionary_To_ZPL_MAIN(DataTable designDt, Dictionary<string, string> sourceDic, DataSet basicDs, string printPort)
        {
            DataTable basicDt = basicDs.Tables["BASIC_CUR"];
            DataTable combiDt = basicDs.Tables["COMBI_CUR"];

            string strOutport = basicDs.Tables["MAC_CUR"].Rows[0][printPort].ToString().Trim();
            if (strOutport == "" || strOutport == "NONE")
            {
                MessageBox.Show("프린터 출력 정보가 정확하지 않습니다! 확인하여 주세요!(" + printPort + ")");
                return;
            }
            DataTable sourceDt = new DataTable();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Columns.Add(inValue.Key.ToString());
            }

            sourceDt.Rows.Add();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Rows[0][inValue.Key.ToString()] = inValue.Value.ToString();
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                //bindDataTable_To_ZPL(dt, dr, basicDt, combiDt, strOutport);
                bindDataTable_To_ZPL(dt, dr, basicDt, strOutport);
            }

            designDt.Dispose();
            basicDt.Dispose();
            combiDt.Dispose();
        }

        public void bindDictionary_To_ZPL_TEST(DataTable designDt, Dictionary<string, string> sourceDic, DataSet basicDs, string ip_port)
        {
            DataTable basicDt = basicDs.Tables["BASIC_CUR"];
            DataTable combiDt = basicDs.Tables["COMBI_CUR"];

            DataTable sourceDt = new DataTable();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Columns.Add(inValue.Key.ToString());
            }

            sourceDt.Rows.Add();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Rows[0][inValue.Key.ToString()] = inValue.Value.ToString();
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                //bindDataTable_To_ZPL(dt, dr, basicDt, combiDt, ip_port);
                bindDataTable_To_ZPL(dt, dr, basicDt, ip_port);
            }

            designDt.Dispose();
            basicDt.Dispose();
            combiDt.Dispose();
        }

        /// <summary>
        /// DataTable로 된 한건의 데이터를 인쇄할때 사용함.
        /// 화면을 refresh하지 않아도 최신 출력포트정보를 가져와서 인쇄하는 기능 포함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="sourceDic">실 데이터(바인딩 용)</param>
        /// /// <param name="basicDs">필드값이 정의 되어 있는 Basic/Combination 필드</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        /// <param name="macaddress">현재 컴퓨터의 맥어드레스값</param>
        public void bindDictionary_To_ZPL_MAIN(DataTable designDt, Dictionary<string, string> sourceDic, DataSet basicDs, string printPort, string macaddress)
        {
            DataSet macDs = clsLabelSet.basic_info_search(macaddress);

            DataTable basicDt = basicDs.Tables["BASIC_CUR"];

            string strOutport = macDs.Tables["MAC_CUR"].Rows[0][printPort].ToString().Trim();
            if (strOutport == "" || strOutport == "NONE")
            {
                MessageBox.Show("프린터 출력 정보가 정확하지 않습니다! 확인하여 주세요!(" + printPort + ")");
                return;
            }
            DataTable sourceDt = new DataTable();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Columns.Add(inValue.Key.ToString());
            }

            sourceDt.Rows.Add();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Rows[0][inValue.Key.ToString()] = inValue.Value.ToString();
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                //bindDataTable_To_ZPL(dt, dr, basicDt, combiDt, strOutport);
                bindDataTable_To_ZPL(dt, dr, basicDt, strOutport);
            }

            designDt.Dispose();
        }

        /// <summary>
        /// DataTable로 된 한건의 데이터를 인쇄할때 사용함.
        /// 화면을 refresh하지 않아도 최신 출력포트정보를 가져와서 인쇄하는 기능 포함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="sourceDic">실 데이터(바인딩 용)</param>
        /// /// <param name="basicDs">필드값이 정의 되어 있는 Basic/Combination 필드</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        /// <param name="macaddress">현재 컴퓨터의 맥어드레스값</param>
        /// <param name="strOuputport">현재 컴퓨터의 테스트 포트</param>
        public void bindDictionary_To_ZPL_MAIN_Config(DataTable designDt, Dictionary<string, string> sourceDic, DataSet basicDs, string printPort, string macaddress, string strOuputport)
        {
            DataSet macDs = clsLabelSet.basic_info_search(macaddress);

            DataTable basicDt = basicDs.Tables["BASIC_CUR"];

            if (strOuputport == "" || strOuputport == "NONE")
            {
                MessageBox.Show("프린터 출력 정보가 정확하지 않습니다! 확인하여 주세요!(" + printPort + ")");
                return;
            }
            DataTable sourceDt = new DataTable();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Columns.Add(inValue.Key.ToString());
            }

            sourceDt.Rows.Add();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Rows[0][inValue.Key.ToString()] = inValue.Value.ToString();
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                //bindDataTable_To_ZPL(dt, dr, basicDt, combiDt, strOutport);
                bindDataTable_To_ZPL(dt, dr, basicDt, strOuputport);
            }

            designDt.Dispose();
        }

        /// <summary>
        /// DataTable로 된 한건의 데이터를 인쇄할때 사용함.
        /// 화면을 refresh하지 않아도 최신 출력포트정보를 가져와서 인쇄하는 기능 포함.
        /// </summary>
        /// <param name="designDt">디자인 스크립트가 들어 있는 DataTable</param>
        /// <param name="sourceDic">실 데이터(바인딩 용)</param>
        /// /// <param name="basicDs">필드값이 정의 되어 있는 Basic/Combination 필드</param>
        /// <param name="printPort">TB_MDM_BCRPORT에 저장되어 있는 MAC ADDRESS 값에 대한 출력포트 정보(TB_MDM_BCRPORT의 필드명)</param>
        /// <param name="Outport">출력되는 포트 명</param>
        public void bindDictionary_To_ZPL_MAIN(DataTable designDt, Dictionary<string, string> sourceDic, DataSet basicDs, string printPort, object Outport)
        {
            

            DataTable basicDt = basicDs.Tables["BASIC_CUR"];
            DataTable combiDt = basicDs.Tables["COMBI_CUR"];

            string strOutport = Outport.ToString().Trim();

            DataTable sourceDt = new DataTable();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Columns.Add(inValue.Key.ToString());
            }

            sourceDt.Rows.Add();
            foreach (KeyValuePair<string, string> inValue in sourceDic)
            {
                sourceDt.Rows[0][inValue.Key.ToString()] = inValue.Value.ToString();
            }

            for (int intSource = 0; intSource < sourceDt.Rows.Count; intSource++)
            {
                DataTable dt = new DataTable();
                dt = DataTableCopy(designDt);
                DataRow dr = sourceDt.Rows[intSource];
                bindDataTable_To_ZPL(dt, dr, basicDt, strOutport);
            }

            designDt.Dispose();
            basicDt.Dispose();
            combiDt.Dispose();
        }

        private void bindDataTable_To_ZPL(DataTable designDt, DataRow sourceDr, string printPort)
        {
            string setbuf = "";

            //for (int i = 0; i < designDt.Rows.Count; i++)
            //{
            //    string tmpbuf = designDt.Rows[i]["LABEL_VALUE"].ToString();

            //    string[] strs = tmpbuf.Split('+');
            //    setbuf = "";
            //    for (int j = 0; j < strs.Length; j++)
            //    {
            //        if (strs[j].Length == 0)
            //            continue;

            //        if (strs[j].Substring(0, 1) == "#")
            //        {
            //            try
            //            {
            //                DataRow[] combis = combiDt.Select("COMBI_ID = '" + strs[j].Replace("#", "") + "'");
            //                if (combis.Length == 1)
            //                {
            //                    setbuf += combis[0]["COMBINATION"].ToString() + "+";
            //                    continue;
            //                }

            //                if (strs.Length > 1)
            //                {
            //                    setbuf += strs[j] + "+";
            //                }
            //            }
            //            catch (Exception ex)
            //            {
            //                setbuf += strs[j];
            //            }
            //        }
            //        else
            //        {
            //            if (strs.Length > 1)
            //            {
            //                setbuf += strs[j] + "+";
            //            }
            //        }
            //    }
            //    if (setbuf.Trim() != "")
            //    {
            //        designDt.Rows[i]["LABEL_VALUE"] = setbuf;
            //    }
            //}

            for (int i = 0; i < designDt.Rows.Count; i++)
            {
                string tmpbuf = designDt.Rows[i]["LABEL_VALUE"].ToString();
                setbuf = "";

                string[] basicStrs = tmpbuf.Split('+');

                for (int j = 0; j < basicStrs.Length; j++)
                {
                    if (basicStrs[j].Length == 0)
                        continue;

                    if (basicStrs[j].Substring(0, 1) == "#")
                    {
                        try
                        {
                            string cmpbuf = sourceDr[basicStrs[j].Replace("#", "")].ToString();

                            setbuf += cmpbuf;
                        }
                        catch (Exception ex)
                        {
                            setbuf += basicStrs[j];
                        }
                    }
                    else
                    {
                        setbuf += basicStrs[j];
                    }
                }
                designDt.Rows[i]["LABEL_VALUE"] = setbuf;
            }

            string zplScript = DataTable_TO_ZPL_Script(designDt);

            string[] printStrs = printPort.Split('^');

            if (printStrs[0] == "TCP")
            {
                string[] portStrs = printStrs[1].Split('/');
                SendData(zplScript, portStrs[0], portStrs[1]);
            }
            else if (printStrs[0] == "COM")
            {
                SerialPort serialPort = new SerialPort();
                serialPort.PortName = printStrs[1];
                serialPort.Parity = Parity.None;
                serialPort.BaudRate = 9600;
                serialPort.DataBits = 8;
                serialPort.StopBits = StopBits.One;
                serialPort.Open();
                if (serialPort.IsOpen)
                {
                    serialPort.Encoding = Encoding.UTF8;

                    serialPort.Write(zplScript);
                    System.Threading.Thread.Sleep(10);
                    serialPort.Close();
                }
                else
                {
                    MessageBox.Show(printStrs[1] + "포트가 오픈되지 않습니다!");
                }

            }
            else if (printStrs[0] == "LPT")
            {

                LptPrint CurrLptCtrl = new LptPrint(printStrs[1].ToLower());
                CurrLptCtrl.Open();
                CurrLptCtrl.Write(zplScript);
                System.Threading.Thread.Sleep(10);
                CurrLptCtrl.Close();
            }
        }

        private void bindDataTable_To_ZPL(DataTable designDt, DataRow sourceDr, DataTable basicDt, string printPort)
        {
            string setbuf = "";



            for (int i = 0; i < designDt.Rows.Count; i++)
            {
                string tmpbuf = designDt.Rows[i]["LABELVALUE"].ToString();
                setbuf = "";

                string[] basicStrs = tmpbuf.Split('+');

                for (int j = 0; j < basicStrs.Length; j++)
                {
                    if (basicStrs[j].Length == 0)
                        continue;

                    if (basicStrs[j].Substring(0, 1) == "#")
                    {
                        try
                        {
                            string cmpbuf = sourceDr[basicStrs[j].ToUpper().Replace("#", "")].ToString();

                            setbuf += cmpbuf;
                        }
                        catch (Exception ex)
                        {
                            setbuf += basicStrs[j];
                        }
                    }
                    else
                    {
                        setbuf += basicStrs[j];
                    }
                }
                designDt.Rows[i]["LABELVALUE"] = setbuf;
            }

            string zplScript = DataTable_TO_ZPL_Script(designDt);

            string[] printStrs = printPort.Split('^');

            if (printStrs[0] == "TCP")
            {
                string[] portStrs = printStrs[1].Split('/');
                SendData(zplScript, portStrs[0], portStrs[1]);
            }
            else if (printStrs[0].IndexOf("COM") == 0)
                {
                SerialPort serialPort = new SerialPort();
                //serialPort.PortName = printStrs[1];
                serialPort.PortName = printStrs[0];
                serialPort.Parity = Parity.None;
                serialPort.BaudRate = 9600;
                serialPort.DataBits = 8;
                serialPort.StopBits = StopBits.One;
                serialPort.Open();
                if (serialPort.IsOpen)
                {
                    serialPort.Encoding = Encoding.UTF8;

                    serialPort.Write(zplScript);
                    System.Threading.Thread.Sleep(10);
                    serialPort.Close();
                }
                else
                {
                    MessageBox.Show(printStrs[1] + "포트가 오픈되지 않습니다!");
                }

            }
            else if (printStrs[0] == "LPT1")
            {
                
                LptPrint CurrLptCtrl = new LptPrint(printStrs[1].ToLower());
                CurrLptCtrl.Open();
                CurrLptCtrl.Write(zplScript);
                System.Threading.Thread.Sleep(10);
                CurrLptCtrl.Close();
            }
        }

        #region DataTable 복사하기
        /// <summary>
        /// 
        ///DataTable 복사
        /// </summary>
        /// <param name="sourceTable">소스 테이블</param>
        /// <returns>타겟 테이블</returns>
        public DataTable DataTableCopy(DataTable sourceTable)
        {
            DataTable targetTable = new DataTable();
            targetTable = sourceTable.Clone();
            for (int i = 0; i < sourceTable.Rows.Count; i++)
            {
                object array = sourceTable.Rows[i].ItemArray.Clone();
                DataRow targetRow = targetTable.NewRow();
                targetRow.ItemArray = (object[])array;
                targetTable.Rows.Add(targetRow);
            }

            return targetTable;
        }
        #endregion
    }
}
