using MetroFramework.Forms;
using MetroFramework.Controls;
using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    public partial class frmPrintConfig : Form
    {
        string _insert_flag = "I";
        string _maccAddress = "";
        public frmPrintConfig()
        {
            InitializeComponent();

            _maccAddress = GetMacAddress();
            lblMacaddress.Text = _maccAddress;

            combobox_init("ALL", ref comboGT);
            combobox_init("ALL", ref comboCT);
            combobox_init("ALL", ref comboPallet);
            combobox_init("ALL", ref comboGanban);
            combobox_init("COM", ref comboPush1);
            combobox_init("COM", ref comboPush2);

            //comboManage.Items.Add("PRODUCT_INPUT");      // POP 실적 입력타입
            comboManage.Items.Add("PRODUCT_COMPLETE");   // POP 실적 완성타입
            comboManage.Items.Add("STOCK");                 // POP 재고 이동타입
            comboManage.Text = "PRODUCT_COMPLETE";


            DataTable printDt = getPrintInfo();

            comboPrint.DataSource = printDt;
            comboPrint.ValueMember = "PRINTID";
            comboPrint.DisplayMember = "PRINTDESC";
            comboPrint.SelectedIndex = 0;

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("MACADDRESS", _maccAddress);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable macDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_bcrport.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);


            if(macDt.Rows.Count > 0)
            {
                _insert_flag = "U";

                string gtprint = macDt.Rows[0]["gtprint"].ToString();
                string ctprint = macDt.Rows[0]["ctprint"].ToString();
                string palletprint = macDt.Rows[0]["palletprint"].ToString();
                string ganbanprint = macDt.Rows[0]["ganbanprint"].ToString();
                string sleep = macDt.Rows[0]["sleep"].ToString();
                string pushbutton1 = macDt.Rows[0]["pushbutton1"].ToString();
                string pushbutton2 = macDt.Rows[0]["pushbutton2"].ToString();
                string usemanagement = macDt.Rows[0]["usemanagement"].ToString();
                string printid = macDt.Rows[0]["printid"].ToString();

                if (gtprint.IndexOf("TCP") >=0)
                {
                    comboGT.Text = "TCP";
                    txtGT.Text = gtprint.Replace("TCP^", "");
                    txtGT.ReadOnly = false;
                }
                else
                {
                    comboGT.Text = gtprint;
                }

                if (ctprint.IndexOf("TCP") >= 0)
                {
                    comboCT.Text = "TCP";
                    txtCT.Text = ctprint.Replace("TCP^", "");
                    txtCT.ReadOnly = false;
                }
                else
                {
                    comboCT.Text = ctprint;
                }

                if (palletprint.IndexOf("TCP") >= 0)
                {
                    comboPallet.Text = "TCP";
                    txtPallet.Text = palletprint.Replace("TCP^", "");
                    txtPallet.ReadOnly = false;
                }
                else
                {
                    comboPallet.Text = palletprint;
                }

                if (ganbanprint.IndexOf("TCP") >= 0)
                {
                    comboGanban.Text = "TCP";
                    txtGanban.Text = ganbanprint.Replace("TCP^", "");
                    txtGanban.ReadOnly = false;
                }
                else
                {
                    comboGanban.Text = ganbanprint;
                }

                txtSleep.Text = sleep;
                comboPush1.Text = pushbutton1;
                comboPush2.Text = pushbutton2;
                comboManage.Text = usemanagement;
                comboPrint.SelectedValue = printid;
            }
            

            comboGT.SelectedIndexChanged += ComboGT_SelectedIndexChanged;
            comboCT.SelectedIndexChanged += ComboCT_SelectedIndexChanged;
            comboPallet.SelectedIndexChanged += ComboPallet_SelectedIndexChanged;
            comboGanban.SelectedIndexChanged += ComboGanban_SelectedIndexChanged;
        }

        private DataTable getPrintInfo()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_printInfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        private void ComboGanban_SelectedIndexChanged(object sender, EventArgs e)
        {
            text_readonly_change(ref comboGanban, ref txtGanban);
        }

        private void ComboGT_SelectedIndexChanged(object sender, EventArgs e)
        {
            text_readonly_change(ref comboGT, ref txtGT);
        }

        private void ComboCT_SelectedIndexChanged(object sender, EventArgs e)
        {
            text_readonly_change(ref comboCT, ref txtCT);
        }

        private void ComboPallet_SelectedIndexChanged(object sender, EventArgs e)
        {
            text_readonly_change(ref comboPallet, ref txtPallet);
        }

        private void text_readonly_change(ref ComboBox combo, ref TextBox textBox)
        {
            if (combo.Text == "TCP")
            {
                textBox.ReadOnly = false;
            }
            else
            {
                textBox.ReadOnly = true;
            }
        }

        private void combobox_init(string flag, ref ComboBox combo)
        {
            combo.Items.Add("NONE");

            string[] portsArray = SerialPort.GetPortNames();

            foreach (string portnumber in portsArray)
            {
                combo.Items.Add(portnumber);
            }

            if (flag != "COM")
            {
                combo.Items.Add("TCP");
                combo.Items.Add("LPT1");
                combo.Items.Add("LPT2");
            }
        }

        private string GetMacAddress()
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

        private void send_test(string scripttype, string outportport)
        {
            Dictionary<string, string> paramPrintMap = new Dictionary<string, string>();
            paramPrintMap.Add("TYPE", scripttype);
            DataTable gt_DesignDt = new DataTable();

            DataSet BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);
            gt_DesignDt = clsLabelSet.LabelDesignDataSet("CONFIG");

            clsLabelSet.map_label_print_Config(paramPrintMap, _maccAddress, scripttype, outportport, ref gt_DesignDt, ref BasicDs);
        }

        private void btnGT_Click(object sender, EventArgs e)
        {
            if(comboGT.Text == "NONE")
            {
                frmMessage frm1 = new frmMessage("출력 PORT 값이 NONE이면 인쇄가 되지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string outputport = comboGT.Text;
            if (comboGT.Text == "TCP")
            {
                outputport = "TCP^" + txtGT.Text.Trim();
            }
            else if (outputport.IndexOf("LPT") == 0)
            {
                outputport = "LPT^" + outputport;
            }

            send_test("GTPRINT", outputport);
        }

        private void btnCT_Click(object sender, EventArgs e)
        {
            if (comboCT.Text == "NONE")
            {
                frmMessage frm1 = new frmMessage("출력 PORT 값이 NONE이면 인쇄가 되지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string outputport = comboCT.Text;
            if (comboCT.Text == "TCP")
            {
                outputport = "TCP^" + txtCT.Text.Trim();
            }
            else if (outputport.IndexOf("LPT") == 0)
            {
                outputport = "LPT^" + outputport;
            }

            send_test("CTPRINT", outputport);
        }

        private void btnPallet_Click(object sender, EventArgs e)
        {
            if (comboPallet.Text == "NONE")
            {
                frmMessage frm1 = new frmMessage("출력 PORT 값이 NONE이면 인쇄가 되지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string outputport = comboPallet.Text;
            if (comboPallet.Text == "TCP")
            {
                outputport = "TCP^" + txtPallet.Text.Trim();
            }
            else if (outputport.IndexOf("LPT") == 0)
            {
                outputport = "LPT^" + outputport;
            }

            send_test("PALLETPRINT", outputport);
        }

        private void btnGanban_Click(object sender, EventArgs e)
        {
            if (comboGanban.Text == "NONE")
            {
                frmMessage frm1 = new frmMessage("출력 PORT 값이 NONE이면 인쇄가 되지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string outputport = comboGanban.Text;
            if (comboGanban.Text == "TCP")
            {
                outputport = "TCP^" + txtGanban.Text.Trim();
            }
            else if (outputport.IndexOf("LPT") == 0)
            {
                outputport = "LPT^" + outputport;
            }

            send_test("GANBANPRINT", outputport);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private string Client_IP()
        {
            IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());
            string ClientIP = string.Empty;
            for (int i = 0; i < host.AddressList.Length; i++)
            {
                if (host.AddressList[i].AddressFamily == AddressFamily.InterNetwork)
                {
                    ClientIP = host.AddressList[i].ToString();
                }
            }
            return ClientIP;
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("저장하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if(result == DialogResult.OK)
            {
                string pcname = SystemInformation.ComputerName;
                string ip = Client_IP();
                string gtprint = comboGT.Text;
                string ctprint = comboCT.Text;
                string palletprint = comboPallet.Text;
                string ganbanprint = comboGanban.Text;
                string pushbutton1 = comboPush1.Text;
                string pushbutton2 = comboPush2.Text;
                string usemanagement = comboManage.Text;
                
                string printid = comboPrint.SelectedValue.ToString();

                if (gtprint == "TCP")
                {
                    gtprint = "TCP^" + txtGT.Text.Trim();
                }

                if (ctprint == "TCP")
                {
                    ctprint = "TCP^" + txtCT.Text.Trim();
                }

                if (palletprint == "TCP")
                {
                    palletprint = "TCP^" + txtPallet.Text.Trim();
                }

                if (ganbanprint == "TCP")
                {
                    ganbanprint = "TCP^" + txtGanban.Text.Trim();
                }

                if (gtprint == "" || ctprint == "" || palletprint == "" || ganbanprint == "")
                {
                    frmMessage frm1 = new frmMessage("모든 값을 입력하여 주세요.", "OK");
                    frm1.ShowDialog();
                    return;
                }

                string query_id = "BCR_PORT_INSERT";
                if (_insert_flag == "U")
                {
                    query_id = "BCR_PORT_UPDATE";
                }

                string bufSleep = "10^2000";
                if(txtSleep.Text.Trim() != "")
                {
                    bufSleep = txtSleep.Text.Trim();
                }

                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("P_MACADDRESS", _maccAddress);
                paramsMap.Add("P_PCNAME", pcname);
                paramsMap.Add("P_IP", ip);
                paramsMap.Add("P_GTPRINT", gtprint);
                paramsMap.Add("P_CTPRINT", ctprint);
                paramsMap.Add("P_PALLETPRINT", palletprint);
                paramsMap.Add("P_SLEEP", bufSleep);
                paramsMap.Add("P_FLAG", query_id);
                paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);
                paramsMap.Add("P_PUSHBUTTON1", pushbutton1);
                paramsMap.Add("P_PUSHBUTTON2", pushbutton2);
                paramsMap.Add("P_USEMANAGEMENT", usemanagement);
                paramsMap.Add("P_GANBANPRINT", ganbanprint);
                paramsMap.Add("P_PRINTID", printid);

                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable macDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_bcrport_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                if(macDt.Rows.Count > 0)
                {
                    if (macDt.Rows[0]["p_err_msg"].ToString().Trim() == "")
                    {
                        macDt.Rows[0]["p_err_msg"] = "0";
                    }

                    if (macDt.Rows[0]["p_err_code"].ToString().Trim() == "OK" && int.Parse(macDt.Rows[0]["p_err_msg"].ToString().Trim()) > 0)
                    {
                        frmMessage frm1 = new frmMessage("프린터 정보가 저장되었습니다.", "OK");
                        frm1.ShowDialog();
                    }
                    else
                    {
                        frmMessage frm1 = new frmMessage("프린터 정보가 저장되지 않았습니다!!!", "OK");
                        frm1.ShowDialog();
                    }
                }
            }
        }

        private void comboGT_SelectedIndexChanged_1(object sender, EventArgs e)
        {

        }

        private void txtGT_TextChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void txtSleep_TextChanged(object sender, EventArgs e)
        {

        }

        private void comboGanban_SelectedIndexChanged_1(object sender, EventArgs e)
        {

        }

        private void label11_Click(object sender, EventArgs e)
        {

        }

        private void txtGanban_TextChanged(object sender, EventArgs e)
        {

        }

        private void comboManage_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void label7_Click(object sender, EventArgs e)
        {

        }

        private void lblMacaddress_Click(object sender, EventArgs e)
        {

        }
    }
}
