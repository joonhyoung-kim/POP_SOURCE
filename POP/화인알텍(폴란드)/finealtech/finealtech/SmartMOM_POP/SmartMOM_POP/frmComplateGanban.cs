using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmComplateGanban : Form
    {
        string inputtype = "";
        string _planqty = "";
        string _prodqty = "";
        int _nonctqty = 0;

        public frmComplateGanban()
        {
            InitializeComponent();
        }

        public frmComplateGanban(string type, string planqty, string prodqty, int nonctqty)
        {
            inputtype = type;
            _planqty = planqty;
            _prodqty = prodqty;
            _nonctqty = nonctqty;

            InitializeComponent();

            label5.Text = planqty;
            label4.Text = prodqty;

            if (inputtype.Equals("GANBAN SCAN") || inputtype.Equals("GANBAN SCAN(O)"))
            {
                txtSN.Enabled = true;
                txtSN2.Enabled = true;
            } else if(inputtype.Equals("ID/GANBAN SCAN") || inputtype.Equals("ID/GANBAN SCAN(O)"))
            {
                if (nonctqty > 0)
                {
                    txtSN.Enabled = true;
                    txtSN2.Text = "Balance automatic closing"; //잔량 자동 마감
                    txtSN2.Enabled = false;
                } else
                {
                    txtSN.Text = "No remaining quantity"; //잔여 수량 없음
                    txtSN.Enabled = false;
                    txtSN2.Text = "No remaining quantity"; //잔여 수량 없음
                    txtSN2.Enabled = false;
                }
            } else if (inputtype.Equals("Online") || inputtype.Equals("Online(O)"))
            {
                if (nonctqty > 0)
                {
                    txtSN.Text = "Balance automatic closing"; //잔량 자동 마감
                    txtSN.Enabled = false;
                    txtSN2.Text = "Balance automatic closing"; //잔량 자동 마감
                    txtSN2.Enabled = false;
                }
                else
                {
                    txtSN.Text = "No remaining quantity"; //잔여 수량 없음
                    txtSN.Enabled = false;
                    txtSN2.Text = "No remaining quantity"; //잔여 수량 없음
                    txtSN2.Enabled = false;
                }
            }

        }

        private void btnConfirm_Click(object sender, EventArgs e)
        {
            if (inputtype.Equals("GANBAN SCAN") || inputtype.Equals("GANBAN SCAN(O)"))
            {
                if (txtSN.Text != "" && txtSN2.Text != "")
                {
                    clsStatic._dialogValue2 = txtSN.Text + "/" + txtSN2.Text;
                    this.Close();
                }
                else if (txtSN.Text == "" && txtSN2.Text == "")
                {
                    clsStatic._dialogValue2 = "NULL";
                    this.Close();
                }
                else
                {
                    if (txtSN.Text == "")
                    {   
                        //Ganban ID 를 입력하세요.
                        frmMessage frm1 = new frmMessage("Please enter your Ganban ID.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }
                    else if (txtSN2.Text == "")
                    {
                        //수량 을 입력하세요.
                        frmMessage frm1 = new frmMessage("Please enter a quantity.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }
                }
            } else if (inputtype.Equals("ID/GANBAN SCAN") || inputtype.Equals("ID/GANBAN SCAN(O)"))
            {
                if (_nonctqty > 0)
                {
                    if (txtSN.Text == "")
                    {
                        //Ganban ID 를 입력하세요.
                        frmMessage frm1 = new frmMessage("Please enter your Ganban ID.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        return;
                    }
                    else
                    {
                        clsStatic._dialogValue2 = txtSN.Text + "/" + txtSN2.Text;
                        this.Close();
                    }
                } else
                {
                    clsStatic._dialogValue2 = "NULL";
                    this.Close();
                }
                
            } else if (inputtype.Equals("Online") || inputtype.Equals("Online(O)"))
            {
                if (txtSN.Text == "")
                {
                    clsStatic._dialogValue2 ="NULL";
                    this.Close();
                }
                else
                {
                    clsStatic._dialogValue2 = txtSN.Text + "/" + txtSN2.Text;
                    this.Close();
                }
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue2 = "CLOSE";
            this.Close();
        }
    }
}
