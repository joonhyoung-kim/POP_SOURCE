using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    public partial class WidgetComboBox : ComboBox
    {
        public WidgetComboBox()
        {
            InitEvents();
        }

        [Description("컨트롤에 열결된 Data를 설정합니다."), Category("Data")]
        public object Data { get; set; }

        [Description("컨트롤에 열결된 언어를 설정합니다."), Category("Language")]
        public String LanguageCode { get; set; }

        [Description("컨트롤에 열결된 언어의 범주를 설정합니다."), Category("Category")]
        public String LanguageCategory { get; set; }

        public void InitEvents()
        {

        }

        public String SelectedFieldValue(String fieldName)
        {
            DataRowView partRow = (DataRowView)this.SelectedItem;
            if (partRow != null)
            {
                if (partRow[fieldName] == null)
                    return String.Empty;
                else
                    return partRow[fieldName].ToString();
            }
            else
            {
                return String.Empty;
            }
        }

        public String getValue()
        {
            return this.SelectedValue.ToString();
        }
    }
}
