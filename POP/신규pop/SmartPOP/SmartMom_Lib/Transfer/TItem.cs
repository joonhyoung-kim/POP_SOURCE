using System;
using System.Data;

namespace TU.Core.Transfer
{
    public class TItem
    {
        public bool IsBinary { get; set; }

        public string Key { get; set; }

        public object Value { get; set; }

        public string DataType { get; set; }

        public TItem() { }

        public TItem(string k, object v, bool isBinary=false)
        {
            IsBinary = isBinary;
            Key = k;
            Value = v;
            DataType = "VARCHAR";
        }

        public TItem(string k, object v, string dataType)
        {
            IsBinary = false;
            Key = k;
            Value = v;
            DataType = dataType.ToUpper();
        }

        public DataColumn MakeColumn()
        {
            DataColumn col = new DataColumn();
            col.ColumnName = Key.ToUpper();
            switch( DataType)
            {
                case "INT":
                    col.DataType = typeof(int);
                    break;
                case "LONG":
                case "BIGDECIMAL":
                    col.DataType = typeof(double);
                    break;
                case "BOOL":
                    col.DataType = typeof(bool);
                    break;
                case "FLOAT":
                    col.DataType = typeof(float);
                    break;
                case "DOUBLE":
                    col.DataType = typeof(double);
                    break;
                case "DATE":
                case "TIME":
                case "DATETIME":
                    col.DataType = typeof(DateTime);
                    break;
                default:
                    col.DataType = typeof(string);
                    break;
            }
            return col;
        }

    }
}
