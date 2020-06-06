using MOM.RPT.Modules.Models;
using TU.Core.Models;

namespace TU.Core.Helpers
{


    /// <summary>
    /// 열거형 자료 Parsing Helper
    /// </summary>
    public class EnumHelper
    {

        public static CodeItem Parse(string code)
        {
            return new CodeItem
            {
                CodeId = code,
                CodeName = TranslationManager.Instance[code],
            };
        }

    }

}
