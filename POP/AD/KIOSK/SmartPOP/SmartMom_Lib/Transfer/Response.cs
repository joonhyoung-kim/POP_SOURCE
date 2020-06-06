using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace TU.Core.Transfer
{
    public class Response : Collection<TCollection>
    {
        public Response()
        {
        }
        private Dictionary<string, object> Parse(int index)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            foreach (TItem item in this.Items[index])
            {
                if (string.IsNullOrEmpty(item.Key)) continue;
                dic[item.Key] = item.Value;
            }
            return dic;
        }
        /// <summary>
        /// dictionary 변환
        /// </summary>
        /// <returns></returns>
        public ObservableCollection<Dictionary<string, object>> Parse()
        {
            ObservableCollection<Dictionary<string, object>> collection = new ObservableCollection<Dictionary<string, object>>();
            for (int index = 0; index < this.Count; index++)
            {
                collection.Add(Parse(index));
            }
            return collection;
        }

    }
}
