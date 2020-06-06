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
    public partial class frmNonProd : Form
    {
        DataTable _nonworkDt = new DataTable();
        int _startbuttonno = 0;
        string _work_day = "";

        public frmNonProd(string work_day)
        {
            InitializeComponent();

            _work_day = work_day;

            non_work_load();
            button_init();
        }

        private void non_work_load()
        {
            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap2.Add("NON_CLASS_ID",   "C");
            paramsList2.Add(paramsMap2);
            string retvalue = "";
            _nonworkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_nonwork_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
        }

        private void button_init()
        {
            var _prodButton = new[] { this.btnItem1, this.btnItem2, this.btnItem3, this.btnItem4 };
            int buttoncnt = _startbuttonno;

            for (int i = 0; i < 4; i++)
            {
                if (buttoncnt >= _nonworkDt.Rows.Count)
                {
                    _prodButton[i].Text = "";
                    _prodButton[i].BackColor = Color.WhiteSmoke;
                    _prodButton[i].Visible = false;
                }
                else
                {
                    _prodButton[i].Text = "[" + _nonworkDt.Rows[buttoncnt]["NONTYPE"].ToString() + "]" +_nonworkDt.Rows[buttoncnt]["NONTYPENAME"].ToString();
                    _prodButton[i].BackColor = Color.Black;
                    _prodButton[i].Visible = true;
                }
                buttoncnt++;
            }

        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

         private void btnItem_Click(object sender, EventArgs e)
        {
            this.Visible = false;
            string buf = ((Label)sender).Text;


            string nontype = buf.Split(']')[0];
            nontype = nontype.Substring(1, nontype.Length - 1);

            DataRow[] drs = _nonworkDt.Select("NONTYPE = '" + nontype + "'");

            string nowclassid = drs[0]["NONCLASSID"].ToString();
            string nowworkcd = drs[0]["NONWORKCD"].ToString();



            frmNonProdTime frm = new frmNonProdTime(buf, _work_day, nowclassid, nowworkcd, nontype, "START");
            frm.ShowDialog();
            this.Close();
        }

        private void bntLeft_Click(object sender, EventArgs e)
        {
            _startbuttonno -= 4;

            if (_startbuttonno < 0)
            {
                int position = _nonworkDt.Rows.Count / 4;
                _startbuttonno = 4 * position;
            }

            button_init();
        }

        private void btnRight_Click(object sender, EventArgs e)
        {
            _startbuttonno += 4;

            if (_startbuttonno > _nonworkDt.Rows.Count)
            {
                _startbuttonno = 0;
            }

            button_init();
        }
    }
}
