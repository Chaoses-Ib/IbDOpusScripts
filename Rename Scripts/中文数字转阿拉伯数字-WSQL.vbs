' 中文数字转阿拉伯数字-WSQL（中文改数字）
' 将中文读法改成阿拉伯数字，如一百二十三改成123，四十五改成45
' 作者：WSQL, @laoqiuqiu
' 版本：220620
' 主页：https://github.com/Chaoses-Ib/IbDOpusScripts

Function OnGetNewName(ByRef getNewNameData)
    Set Item = getNewNameData.Item
	'正则表达式判断是不是中文读法，不够严谨
    Dim Reg
    Set Reg = CreateObject("vbscript.regexp")
    Reg.Pattern = "[一二三四五六七八九十百千万零]{1,}" '正则表达式
    Set Match = Reg.Execute(Item.name_stem)
	'当匹配数=1时就改名
    If Match.Count = 1 Then
	   
	   OnGetNewName=Replace(Item.name_stem,Match.Item(0).Value,ConverToDigit(Match.Item(0).Value)) & Item.ext
	else
		OnGetNewName=true
    End If
    
End Function

'将单个文字转换成数字
Function ToDigit(cn)
    Number = 0
    Select Case cn
    Case "壹", "一"
        Number = 1
    Case "两", "贰", "二"
        Number = 2
    Case "叁", "三"
        Number = 3
    Case "肆", "四"
        Number = 4
    Case "伍", "五"
        Number = 5
    Case "陆", "六"
        Number = 6
    Case "柒", "七"
        Number = 7
    Case "捌", "八"
        Number = 8
    Case "玖", "九"
        Number = 9
    Case "拾", "十"
        Number = 10
    Case "佰", "百"
        Number = 100
    Case "仟", "千"
        Number = 1000
    Case "萬"
    Case "万"
        Number = 10000
    Case "零"
    Case Else
        Number = 0
    End Select
    ToDigit = Number
End Function

'转成成阿拉伯数字
Function ConverToDigit(cnNumber)
    result = 0
    temp = 0
    cnNumber = FixChs(cnNumber)
    For c = 1 To len(cnNumber)
        temp2 = Mid(cnNumber, c, 1)
        temp1 = ToDigit(temp2)
        If temp1 = 10000 Then
            result = result + temp
            result = result * 10000
            temp = 0
        ElseIf temp1 > 9 Then
            If temp1 = 10 And temp = 0 Then
                temp = 1
            End If
            result = result + temp * temp1
            temp = 0
        Else
            temp = temp1
        End If
    Next
    result = result + temp
    ConverToDigit = result
End Function

'修正二百五，三万三的情况
'@laoqiuqiu
Function FixChs(cnNumber)
	Dim LU, SLU
	LU = ToDigit(Right(cnNumber,1))
	SLU = ToDigit(Left(Right(cnNumber,2),1))
	FixChs = cnNumber
	If (SLU > 10) And (LU < 10) Then
		Select Case SLU
			Case 100       : FixChs = cnNumber & "十"
			Case 1000      : FixChs = cnNumber & "百"
			Case 10000     : FixChs = cnNumber & "千"
			Case 100000000 : FixChs = cnNumber & "千万"
		End Select
	End If
End Function